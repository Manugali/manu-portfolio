import { createSeedRecords, recordsForSource, SOURCE_META } from "./seed";
import type {
  BridgeSnapshot,
  DeadLetterItem,
  FailureMode,
  LegacySource,
  SourceId,
  SourceRecord,
  SyncRun,
  TargetRecord,
} from "./types";
import { SOURCE_IDS } from "./types";

type BridgeState = {
  sourceRecords: SourceRecord[];
  sources: LegacySource[];
  target: TargetRecord[];
  runs: SyncRun[];
  deadLetter: DeadLetterItem[];
  updatedAt: string;
};

function buildSources(
  records: SourceRecord[],
  failureModes: Record<SourceId, FailureMode>,
  lastSync: Record<SourceId, string | null>
): LegacySource[] {
  return SOURCE_META.map((meta) => {
    const mode = failureModes[meta.id];
    const health =
      mode === "timeout" ? "degraded" : mode === "bad_payload" ? "degraded" : "healthy";
    return {
      ...meta,
      health,
      lastSyncAt: lastSync[meta.id],
      failureMode: mode,
      recordCount: recordsForSource(meta.id, records).length,
    };
  });
}

function emptyFailureModes(): Record<SourceId, FailureMode> {
  return { hr: "none", policy: "none", gl: "none" };
}

function emptyLastSync(): Record<SourceId, string | null> {
  return { hr: null, policy: null, gl: null };
}

function createInitialState(): BridgeState {
  const sourceRecords = createSeedRecords();
  return {
    sourceRecords,
    sources: buildSources(sourceRecords, emptyFailureModes(), emptyLastSync()),
    target: [],
    runs: [],
    deadLetter: [],
    updatedAt: new Date().toISOString(),
  };
}

const globalStore = globalThis as typeof globalThis & {
  __legacyBridgeStore?: BridgeState;
};

function state(): BridgeState {
  if (!globalStore.__legacyBridgeStore) {
    globalStore.__legacyBridgeStore = createInitialState();
  }
  return globalStore.__legacyBridgeStore;
}

function touch() {
  state().updatedAt = new Date().toISOString();
}

export function resetBridgeStore(): BridgeSnapshot {
  globalStore.__legacyBridgeStore = createInitialState();
  return getSnapshot();
}

export function getSnapshot(): BridgeSnapshot {
  const s = state();
  return {
    sources: s.sources,
    runs: s.runs.map(summarizeRun),
    deadLetter: s.deadLetter,
    targetCount: s.target.length,
    updatedAt: s.updatedAt,
  };
}

function summarizeRun(run: SyncRun): SyncRun {
  return {
    ...run,
    records: run.records,
  };
}

export function getSources(): LegacySource[] {
  return state().sources;
}

export function getSourceRecords(sourceId?: SourceId): SourceRecord[] {
  const all = state().sourceRecords;
  return sourceId ? recordsForSource(sourceId, all) : all;
}

export function setFailureMode(sourceId: SourceId, mode: FailureMode): LegacySource {
  const s = state();
  const modes = Object.fromEntries(s.sources.map((src) => [src.id, src.failureMode])) as Record<
    SourceId,
    FailureMode
  >;
  const lastSync = Object.fromEntries(s.sources.map((src) => [src.id, src.lastSyncAt])) as Record<
    SourceId,
    string | null
  >;
  modes[sourceId] = mode;
  s.sources = buildSources(s.sourceRecords, modes, lastSync);
  touch();
  return s.sources.find((src) => src.id === sourceId)!;
}

export function getRuns(): SyncRun[] {
  return state().runs;
}

export function getRun(id: string): SyncRun | undefined {
  return state().runs.find((run) => run.id === id);
}

export function addRun(run: SyncRun): SyncRun {
  state().runs.unshift(run);
  touch();
  return run;
}

export function updateRun(run: SyncRun): SyncRun {
  const s = state();
  const index = s.runs.findIndex((r) => r.id === run.id);
  if (index >= 0) {
    s.runs[index] = run;
  }
  touch();
  return run;
}

export function getTargetRecords(): TargetRecord[] {
  return state().target;
}

export function upsertTarget(record: TargetRecord): void {
  const s = state();
  const index = s.target.findIndex(
    (t) => t.sourceId === record.sourceId && t.externalId === record.externalId
  );
  if (index >= 0) {
    s.target[index] = record;
  } else {
    s.target.push(record);
  }
  touch();
}

export function markSourceSynced(sourceId: SourceId, at: string): void {
  const s = state();
  s.sources = s.sources.map((src) =>
    src.id === sourceId ? { ...src, lastSyncAt: at, health: "healthy" as const } : src
  );
  touch();
}

export function getDeadLetter(): DeadLetterItem[] {
  return state().deadLetter;
}

export function addDeadLetter(item: DeadLetterItem): void {
  state().deadLetter.unshift(item);
  touch();
}

export function updateDeadLetter(
  id: string,
  status: DeadLetterItem["status"]
): DeadLetterItem | undefined {
  const s = state();
  const item = s.deadLetter.find((d) => d.id === id);
  if (!item) return undefined;
  item.status = status;
  touch();
  return item;
}

export function getOpenDeadLetter(id: string): DeadLetterItem | undefined {
  return state().deadLetter.find((d) => d.id === id && d.status === "open");
}

export function allSourceIds(): SourceId[] {
  return [...SOURCE_IDS];
}
