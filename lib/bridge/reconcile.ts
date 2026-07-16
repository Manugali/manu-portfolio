import { mapRecord } from "./adapters";
import { getRun, getRuns, getSourceRecords, getTargetRecords } from "./store";
import type { ReconcileDiff, ReconcileReport, SourceId } from "./types";

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const obj = value as Record<string, unknown>;
  return `{${Object.keys(obj)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(obj[key])}`)
    .join(",")}}`;
}

export function buildReconcileReport(runId?: string | null): ReconcileReport {
  const sourceRecords = getSourceRecords();
  const targetRecords = getTargetRecords();
  const latestId = getRuns()[0]?.id ?? null;
  const run = runId ? getRun(runId) : latestId ? getRun(latestId) : undefined;

  const sourceKeys = new Map<
    string,
    { sourceId: SourceId; externalId: string; data: Record<string, unknown> }
  >();
  for (const record of sourceRecords) {
    sourceKeys.set(`${record.sourceId}:${record.externalId}`, {
      sourceId: record.sourceId,
      externalId: record.externalId,
      data: mapRecord(record),
    });
  }

  const targetKeys = new Map(
    targetRecords.map((record) => [`${record.sourceId}:${record.externalId}`, record] as const)
  );

  const diffs: ReconcileDiff[] = [];
  const allKeys = new Set([...sourceKeys.keys(), ...targetKeys.keys()]);

  for (const key of allKeys) {
    const source = sourceKeys.get(key);
    const target = targetKeys.get(key);

    if (source && target) {
      const matched = stableStringify(source.data) === stableStringify(target.data);
      diffs.push({
        sourceId: source.sourceId,
        externalId: source.externalId,
        status: matched ? "matched" : "drift",
        sourceData: source.data,
        targetData: target.data,
      });
    } else if (source && !target) {
      diffs.push({
        sourceId: source.sourceId,
        externalId: source.externalId,
        status: "missing_in_target",
        sourceData: source.data,
      });
    } else if (!source && target) {
      diffs.push({
        sourceId: target.sourceId,
        externalId: target.externalId,
        status: "missing_in_source",
        targetData: target.data,
      });
    }
  }

  diffs.sort((a, b) => {
    const order = { drift: 0, missing_in_target: 1, missing_in_source: 2, matched: 3 };
    return order[a.status] - order[b.status] || a.externalId.localeCompare(b.externalId);
  });

  return {
    generatedAt: new Date().toISOString(),
    runId: run?.id ?? null,
    sourceCount: sourceKeys.size,
    targetCount: targetKeys.size,
    matched: diffs.filter((d) => d.status === "matched").length,
    missingInTarget: diffs.filter((d) => d.status === "missing_in_target").length,
    missingInSource: diffs.filter((d) => d.status === "missing_in_source").length,
    drift: diffs.filter((d) => d.status === "drift").length,
    diffs,
  };
}
