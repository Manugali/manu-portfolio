import type { RecordOutcome, RunStatus, SourceHealth, StepStatus } from "@/lib/bridge/types";

export function runStatusClass(status: RunStatus): string {
  switch (status) {
    case "completed":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
    case "running":
    case "queued":
      return "border-sky-500/40 bg-sky-500/10 text-sky-300";
    case "partial":
      return "border-amber-500/40 bg-amber-500/10 text-amber-200";
    case "failed":
      return "border-red-500/40 bg-red-500/10 text-red-300";
  }
}

export function healthClass(health: SourceHealth): string {
  switch (health) {
    case "healthy":
      return "text-emerald-300";
    case "degraded":
      return "text-amber-200";
    case "down":
      return "text-red-300";
  }
}

export function outcomeClass(outcome: RecordOutcome): string {
  switch (outcome) {
    case "succeeded":
      return "text-emerald-300";
    case "pending":
      return "text-[--muted-foreground]";
    case "failed":
      return "text-red-300";
    case "dead_lettered":
      return "text-amber-200";
  }
}

export function stepClass(status: StepStatus): string {
  switch (status) {
    case "succeeded":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "running":
    case "retried":
      return "border-sky-500/30 bg-sky-500/10 text-sky-300";
    case "failed":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    case "skipped":
      return "border-[--border] bg-[--muted]/40 text-[--muted-foreground]";
    case "pending":
      return "border-[--border] text-[--muted-foreground]";
  }
}
