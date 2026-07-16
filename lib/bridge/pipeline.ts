import { fetchFromAdapter, mapRecord, validateMapped } from "./adapters";
import { recordsForSource } from "./seed";
import {
  addDeadLetter,
  addRun,
  getOpenDeadLetter,
  getRun,
  getSourceRecords,
  getSources,
  markSourceSynced,
  setFailureMode,
  updateDeadLetter,
  updateRun,
  upsertTarget,
} from "./store";
import type { FailureMode, PipelineStep, RecordResult, SourceId, SyncRun } from "./types";
import { MAX_ATTEMPTS } from "./types";

function id(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function now(): string {
  return new Date().toISOString();
}

function emptySteps(): PipelineStep[] {
  return [
    { name: "fetch", status: "pending", attempt: 0 },
    { name: "map", status: "pending", attempt: 0 },
    { name: "validate", status: "pending", attempt: 0 },
    { name: "write", status: "pending", attempt: 0 },
  ];
}

function recomputeTotals(run: SyncRun): SyncRun["totals"] {
  const succeeded = run.records.filter((r) => r.outcome === "succeeded").length;
  const failed = run.records.filter((r) => r.outcome === "failed").length;
  const deadLettered = run.records.filter((r) => r.outcome === "dead_lettered").length;
  const pending = run.records.filter((r) => r.outcome === "pending").length;
  return {
    total: run.records.length,
    succeeded,
    failed,
    deadLettered,
    pending,
  };
}

function finalizeStatus(run: SyncRun): SyncRun["status"] {
  const { pending, succeeded, failed, deadLettered, total } = run.totals;
  if (pending > 0) return "running";
  if (succeeded === total) return "completed";
  if (succeeded === 0 && (failed > 0 || deadLettered > 0)) return "failed";
  return "partial";
}

function setStep(
  steps: PipelineStep[],
  name: PipelineStep["name"],
  patch: Partial<PipelineStep>
): PipelineStep[] {
  return steps.map((step) => (step.name === name ? { ...step, ...patch } : step));
}

/** Create a queued sync run for the selected sources. */
export function startSyncRun(sourceIds: SourceId[]): SyncRun {
  const sources = getSources();
  const selected = sourceIds.length > 0 ? sourceIds : (["hr", "policy", "gl"] as SourceId[]);
  const allRecords = getSourceRecords();

  const records: RecordResult[] = [];
  for (const sourceId of selected) {
    const source = sources.find((s) => s.id === sourceId);
    if (!source) continue;
    const batch = recordsForSource(sourceId, allRecords);
    const expanded =
      source.failureMode === "duplicate" ? [...batch, ...batch] : batch;

    for (const record of expanded) {
      records.push({
        id: id("rec"),
        sourceId,
        externalId: record.externalId,
        outcome: "pending",
        attempts: 0,
        steps: emptySteps(),
      });
    }
  }

  const run: SyncRun = {
    id: id("run"),
    status: "queued",
    sourceIds: selected,
    createdAt: now(),
    cursor: 0,
    totals: {
      total: records.length,
      succeeded: 0,
      failed: 0,
      deadLettered: 0,
      pending: records.length,
    },
    records,
  };

  return addRun(run);
}

function processOneRecord(run: SyncRun, index: number): void {
  const result = run.records[index];
  if (!result || result.outcome !== "pending") return;

  const source = getSources().find((s) => s.id === result.sourceId);
  if (!source) {
    result.outcome = "failed";
    result.error = "Unknown source";
    return;
  }

  const sourceRecords = recordsForSource(result.sourceId, getSourceRecords());
  const raw = sourceRecords.find((r) => r.externalId === result.externalId);
  if (!raw) {
    result.outcome = "failed";
    result.error = "Source record missing";
    return;
  }

  // Failure injection applies to the first record of each source so the rest of the batch can succeed.
  const firstIndexForSource = run.records.findIndex((r) => r.sourceId === result.sourceId);
  const isInjectedRecord = firstIndexForSource === index;

  let attempt = 1;
  let fetchOk = false;
  let fetchedPayload = raw;
  let mode: FailureMode = "none";
  if (isInjectedRecord) {
    mode = source.failureMode;
  } else if (source.failureMode === "duplicate") {
    // Duplicates are expanded at run creation; later copies still write idempotently.
    mode = "none";
  }

  while (attempt <= MAX_ATTEMPTS && !fetchOk) {
    result.attempts = attempt;
    result.steps = setStep(result.steps, "fetch", {
      status: attempt > 1 ? "retried" : "running",
      attempt,
      startedAt: now(),
      message: attempt > 1 ? `Retry ${attempt - 1}` : undefined,
    });

    const fetchResult = fetchFromAdapter(result.sourceId, [raw], mode, attempt);

    if (!fetchResult.ok) {
      result.steps = setStep(result.steps, "fetch", {
        status: "failed",
        finishedAt: now(),
        message: fetchResult.error,
        attempt,
      });
      if (!fetchResult.retryable || attempt === MAX_ATTEMPTS) {
        result.outcome = "dead_lettered";
        result.error = fetchResult.error;
        addDeadLetter({
          id: id("dlq"),
          runId: run.id,
          sourceId: result.sourceId,
          externalId: result.externalId,
          error: fetchResult.error,
          payload: raw.payload,
          createdAt: now(),
          status: "open",
        });
        result.steps = setStep(result.steps, "map", { status: "skipped", attempt });
        result.steps = setStep(result.steps, "validate", { status: "skipped", attempt });
        result.steps = setStep(result.steps, "write", { status: "skipped", attempt });
        return;
      }
      attempt += 1;
      continue;
    }

    fetchOk = true;
    fetchedPayload = fetchResult.records[0] ?? raw;
    result.steps = setStep(result.steps, "fetch", {
      status: "succeeded",
      finishedAt: now(),
      message: attempt > 1 ? "Adapter recovered after retry" : "Adapter response received",
      attempt,
    });
  }

  result.steps = setStep(result.steps, "map", {
    status: "running",
    attempt: result.attempts,
    startedAt: now(),
  });
  const mapped = mapRecord(fetchedPayload);
  result.mapped = mapped;
  result.steps = setStep(result.steps, "map", {
    status: "succeeded",
    finishedAt: now(),
    message: "Canonical shape applied",
  });

  result.steps = setStep(result.steps, "validate", {
    status: "running",
    attempt: result.attempts,
    startedAt: now(),
  });
  const validation = validateMapped(result.sourceId, mapped, fetchedPayload);
  if (!validation.ok) {
    result.steps = setStep(result.steps, "validate", {
      status: "failed",
      finishedAt: now(),
      message: validation.error,
    });
    result.steps = setStep(result.steps, "write", { status: "skipped", attempt: result.attempts });
    result.outcome = "dead_lettered";
    result.error = validation.error;
    addDeadLetter({
      id: id("dlq"),
      runId: run.id,
      sourceId: result.sourceId,
      externalId: result.externalId,
      error: validation.error,
      payload: fetchedPayload.payload,
      createdAt: now(),
      status: "open",
    });
    return;
  }
  result.steps = setStep(result.steps, "validate", {
    status: "succeeded",
    finishedAt: now(),
    message: "Schema checks passed",
  });

  const alreadyWritten = run.records.some(
    (r, idx) =>
      idx < index &&
      r.sourceId === result.sourceId &&
      r.externalId === result.externalId &&
      r.outcome === "succeeded"
  );

  result.steps = setStep(result.steps, "write", {
    status: "running",
    attempt: result.attempts,
    startedAt: now(),
  });
  const syncedAt = now();
  upsertTarget({
    id: `${result.sourceId}:${result.externalId}`,
    sourceId: result.sourceId,
    externalId: result.externalId,
    data: mapped,
    syncedAt,
    runId: run.id,
  });
  result.steps = setStep(result.steps, "write", {
    status: "succeeded",
    finishedAt: syncedAt,
    message: alreadyWritten
      ? "Idempotent upsert (duplicate suppressed)"
      : "Written to Payout Ops",
  });
  result.outcome = "succeeded";
}

/** Advance a run by processing up to `batchSize` pending records. */
export function advanceRun(runId: string, batchSize = 2): SyncRun | undefined {
  const existing = getRun(runId);
  if (!existing) return undefined;

  if (existing.status === "queued") {
    existing.status = "running";
    existing.startedAt = now();
  }

  if (existing.status !== "running") {
    return existing;
  }

  let processed = 0;
  while (processed < batchSize && existing.cursor < existing.records.length) {
    processOneRecord(existing, existing.cursor);
    existing.cursor += 1;
    processed += 1;
  }

  existing.totals = recomputeTotals(existing);
  existing.status = finalizeStatus(existing);

  if (existing.status !== "running") {
    existing.finishedAt = now();
    for (const sourceId of existing.sourceIds) {
      const sourceHadSuccess = existing.records.some(
        (r) => r.sourceId === sourceId && r.outcome === "succeeded"
      );
      if (sourceHadSuccess) {
        markSourceSynced(sourceId, existing.finishedAt);
      }
    }
  }

  return updateRun(existing);
}

export function getOrAdvanceRun(runId: string, advance = true): SyncRun | undefined {
  const run = getRun(runId);
  if (!run) return undefined;
  if (!advance) return run;
  if (run.status === "queued" || run.status === "running") {
    return advanceRun(runId, 2);
  }
  return run;
}

/** Reprocess a dead-letter item into a mini single-record run after clearing failure mode. */
export function reprocessDeadLetter(deadLetterId: string): SyncRun | { error: string } {
  const item = getOpenDeadLetter(deadLetterId);
  if (!item) return { error: "Dead-letter item not found or already closed" };

  // Clear the poison mode so reprocess can succeed in the demo.
  setFailureMode(item.sourceId, "none");
  updateDeadLetter(deadLetterId, "reprocessed");

  const run = startSyncRun([item.sourceId]);
  run.records = run.records.filter((r) => r.externalId === item.externalId);
  run.totals = recomputeTotals(run);
  updateRun(run);

  return advanceRun(run.id, 50) ?? run;
}
