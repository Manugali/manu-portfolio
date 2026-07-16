export type SourceId = "hr" | "policy" | "gl";

export type FailureMode = "none" | "timeout" | "bad_payload" | "duplicate";

export type SourceHealth = "healthy" | "degraded" | "down";

export type RunStatus = "queued" | "running" | "completed" | "failed" | "partial";

export type StepName = "fetch" | "map" | "validate" | "write";

export type StepStatus = "pending" | "running" | "succeeded" | "failed" | "skipped" | "retried";

export type RecordOutcome = "pending" | "succeeded" | "failed" | "dead_lettered";

export type SourceRecord = {
  externalId: string;
  sourceId: SourceId;
  payload: Record<string, unknown>;
};

export type TargetRecord = {
  id: string;
  sourceId: SourceId;
  externalId: string;
  data: Record<string, unknown>;
  syncedAt: string;
  runId: string;
};

export type PipelineStep = {
  name: StepName;
  status: StepStatus;
  startedAt?: string;
  finishedAt?: string;
  message?: string;
  attempt: number;
};

export type RecordResult = {
  id: string;
  sourceId: SourceId;
  externalId: string;
  outcome: RecordOutcome;
  attempts: number;
  steps: PipelineStep[];
  error?: string;
  mapped?: Record<string, unknown>;
};

export type SyncRun = {
  id: string;
  status: RunStatus;
  sourceIds: SourceId[];
  createdAt: string;
  startedAt?: string;
  finishedAt?: string;
  cursor: number;
  totals: {
    total: number;
    succeeded: number;
    failed: number;
    deadLettered: number;
    pending: number;
  };
  records: RecordResult[];
};

export type LegacySource = {
  id: SourceId;
  name: string;
  system: string;
  protocol: string;
  description: string;
  health: SourceHealth;
  lastSyncAt: string | null;
  failureMode: FailureMode;
  recordCount: number;
};

export type DeadLetterItem = {
  id: string;
  runId: string;
  sourceId: SourceId;
  externalId: string;
  error: string;
  payload: Record<string, unknown>;
  createdAt: string;
  status: "open" | "reprocessed" | "discarded";
};

export type ReconcileDiff = {
  sourceId: SourceId;
  externalId: string;
  status: "matched" | "missing_in_target" | "missing_in_source" | "drift";
  sourceData?: Record<string, unknown>;
  targetData?: Record<string, unknown>;
};

export type ReconcileReport = {
  generatedAt: string;
  runId: string | null;
  sourceCount: number;
  targetCount: number;
  matched: number;
  missingInTarget: number;
  missingInSource: number;
  drift: number;
  diffs: ReconcileDiff[];
};

export type BridgeSnapshot = {
  sources: LegacySource[];
  runs: SyncRun[];
  deadLetter: DeadLetterItem[];
  targetCount: number;
  updatedAt: string;
};

export const SOURCE_IDS: SourceId[] = ["hr", "policy", "gl"];

export const FAILURE_MODES: { id: FailureMode; label: string; description: string }[] = [
  { id: "none", label: "None", description: "Happy path" },
  { id: "timeout", label: "Timeout", description: "Legacy socket hangs, then retries" },
  { id: "bad_payload", label: "Bad payload", description: "Malformed fields fail validation" },
  { id: "duplicate", label: "Duplicate", description: "Replay already-synced IDs" },
];

export const MAX_ATTEMPTS = 3;
