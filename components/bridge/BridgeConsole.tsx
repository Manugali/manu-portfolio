"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  GitCompare,
  Inbox,
  Play,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { ArchitectureDiagram } from "@/components/bridge/ArchitectureDiagram";
import {
  healthClass,
  outcomeClass,
  runStatusClass,
  stepClass,
} from "@/components/bridge/statusStyles";
import type {
  BridgeSnapshot,
  DeadLetterItem,
  FailureMode,
  LegacySource,
  ReconcileReport,
  SourceId,
  SyncRun,
} from "@/lib/bridge/types";
import { FAILURE_MODES } from "@/lib/bridge/types";
import { cn } from "@/lib/utils";

type Tab = "overview" | "runs" | "dlq" | "reconcile";

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const error = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(error.error ?? `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export function BridgeConsole() {
  const [tab, setTab] = useState<Tab>("overview");
  const [sources, setSources] = useState<LegacySource[]>([]);
  const [runs, setRuns] = useState<SyncRun[]>([]);
  const [activeRun, setActiveRun] = useState<SyncRun | null>(null);
  const [deadLetter, setDeadLetter] = useState<DeadLetterItem[]>([]);
  const [report, setReport] = useState<ReconcileReport | null>(null);
  const [selectedSources, setSelectedSources] = useState<SourceId[]>(["hr", "policy", "gl"]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetCount, setTargetCount] = useState(0);

  const refreshSnapshot = useCallback(async () => {
    const data = await jsonFetch<{ snapshot: BridgeSnapshot }>("/api/bridge");
    setSources(data.snapshot.sources);
    setRuns(data.snapshot.runs);
    setDeadLetter(data.snapshot.deadLetter);
    setTargetCount(data.snapshot.targetCount);
    setActiveRun((current) => {
      if (!current) return current;
      return data.snapshot.runs.find((run) => run.id === current.id) ?? current;
    });
  }, []);

  useEffect(() => {
    refreshSnapshot().catch((err: Error) => setError(err.message));
  }, [refreshSnapshot]);

  useEffect(() => {
    if (!activeRun || (activeRun.status !== "queued" && activeRun.status !== "running")) {
      return;
    }

    const timer = window.setInterval(() => {
      jsonFetch<{ run: SyncRun }>(`/api/bridge/runs/${activeRun.id}?advance=1`)
        .then(({ run }) => {
          setActiveRun(run);
          setRuns((prev) => {
            const others = prev.filter((item) => item.id !== run.id);
            return [run, ...others];
          });
          if (run.status !== "queued" && run.status !== "running") {
            refreshSnapshot().catch(() => undefined);
          }
        })
        .catch((err: Error) => setError(err.message));
    }, 450);

    return () => window.clearInterval(timer);
  }, [activeRun, refreshSnapshot]);

  async function handleStartRun() {
    setBusy(true);
    setError(null);
    try {
      const { run } = await jsonFetch<{ run: SyncRun }>("/api/bridge/runs", {
        method: "POST",
        body: JSON.stringify({ sourceIds: selectedSources }),
      });
      setActiveRun(run);
      setTab("runs");
      await refreshSnapshot();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start run");
    } finally {
      setBusy(false);
    }
  }

  async function handleFailureMode(sourceId: SourceId, failureMode: FailureMode) {
    setError(null);
    try {
      const data = await jsonFetch<{ sources: LegacySource[] }>("/api/bridge/sources", {
        method: "PATCH",
        body: JSON.stringify({ sourceId, failureMode }),
      });
      setSources(data.sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update failure mode");
    }
  }

  async function handleReset() {
    setBusy(true);
    setError(null);
    try {
      const data = await jsonFetch<{ snapshot: BridgeSnapshot }>("/api/bridge/reset", {
        method: "POST",
      });
      setSources(data.snapshot.sources);
      setRuns(data.snapshot.runs);
      setDeadLetter(data.snapshot.deadLetter);
      setTargetCount(data.snapshot.targetCount);
      setActiveRun(null);
      setReport(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset demo");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeadLetter(id: string, action: "reprocess" | "discard") {
    setBusy(true);
    setError(null);
    try {
      const data = await jsonFetch<{
        deadLetter: DeadLetterItem[];
        run?: SyncRun;
      }>("/api/bridge/dead-letter", {
        method: "POST",
        body: JSON.stringify({ id, action }),
      });
      setDeadLetter(data.deadLetter);
      if (data.run) {
        setActiveRun(data.run);
        setTab("runs");
      }
      await refreshSnapshot();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Dead-letter action failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleReconcile() {
    setBusy(true);
    setError(null);
    try {
      const query = activeRun ? `?runId=${activeRun.id}` : "";
      const data = await jsonFetch<{ report: ReconcileReport }>(`/api/bridge/reconcile${query}`);
      setReport(data.report);
      setTab("reconcile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reconcile failed");
    } finally {
      setBusy(false);
    }
  }

  function toggleSource(sourceId: SourceId) {
    setSelectedSources((prev) =>
      prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Activity }[] = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "runs", label: "Runs", icon: Play },
    { id: "dlq", label: "Dead letter", icon: Inbox },
    { id: "reconcile", label: "Reconcile", icon: GitCompare },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-[--muted-foreground] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Projects
          </Link>
          <div>
            <p className="section-label">Labs · Meridian Financial</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Legacy Bridge Simulator
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[--muted-foreground]">
              Watch mock legacy HR, Policy, and GL systems sync into Payout Ops — with retries,
              dead-letter handling, and reconciliation.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleStartRun}
            disabled={busy || selectedSources.length === 0}
            className="btn-primary disabled:opacity-50"
          >
            <Play className="h-4 w-4" />
            Run sync
          </button>
          <button
            type="button"
            onClick={handleReconcile}
            disabled={busy}
            className="btn-secondary disabled:opacity-50"
          >
            <GitCompare className="h-4 w-4" />
            Reconcile
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={busy}
            className="btn-secondary disabled:opacity-50"
            title="Reset demo state"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Sources" value={String(sources.length)} />
        <Stat label="Target records" value={String(targetCount)} />
        <Stat label="Runs" value={String(runs.length)} />
        <Stat
          label="Open DLQ"
          value={String(deadLetter.filter((item) => item.status === "open").length)}
        />
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[--border] pb-3">
        {tabs.map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[--card] text-[--foreground]"
                  : "text-[--muted-foreground] hover:text-[--foreground]"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {tab === "overview" ? (
        <div className="space-y-6">
          <section className="glass-card space-y-4 p-5">
            <div>
              <p className="section-label">Architecture</p>
              <h2 className="mt-1 text-lg font-semibold">Integration path</h2>
            </div>
            <ArchitectureDiagram />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="section-label">Sources</p>
                <h2 className="mt-1 text-lg font-semibold">Legacy adapters</h2>
              </div>
              <p className="text-xs text-[--muted-foreground]">
                Toggle failure modes, then run a sync
              </p>
            </div>

            <div className="grid gap-3">
              {sources.map((source) => {
                const selected = selectedSources.includes(source.id);
                return (
                  <article key={source.id} className="glass-card space-y-4 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{source.name}</h3>
                          <span className={cn("text-xs capitalize", healthClass(source.health))}>
                            {source.health}
                          </span>
                        </div>
                        <p className="text-sm text-[--muted-foreground]">{source.description}</p>
                        <p className="text-xs text-[--muted-foreground]">
                          {source.system} · {source.protocol} · {source.recordCount} records
                          {source.lastSyncAt
                            ? ` · last sync ${new Date(source.lastSyncAt).toLocaleTimeString()}`
                            : " · never synced"}
                        </p>
                      </div>

                      <label className="inline-flex items-center gap-2 text-sm text-[--muted-foreground]">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleSource(source.id)}
                          className="rounded border-[--border]"
                        />
                        Include in next run
                      </label>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {FAILURE_MODES.map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => handleFailureMode(source.id, mode.id)}
                          title={mode.description}
                          className={cn(
                            "rounded-lg border px-3 py-1.5 text-xs transition-colors",
                            source.failureMode === mode.id
                              ? "border-[--foreground] bg-[--foreground] text-[--background]"
                              : "border-[--border] text-[--muted-foreground] hover:border-[#404040] hover:text-[--foreground]"
                          )}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="glass-card space-y-3 p-5">
            <p className="section-label">Case study</p>
            <h2 className="text-lg font-semibold">Why this exists</h2>
            <div className="grid gap-4 text-sm leading-relaxed text-[--muted-foreground] sm:grid-cols-2">
              <p>
                <span className="font-medium text-[--foreground]">Problem. </span>
                Payout Ops needs trustworthy employee, policy, and ledger data from systems that
                were never designed for real-time APIs.
              </p>
              <p>
                <span className="font-medium text-[--foreground]">Constraints. </span>
                Partial failures, duplicate deliveries, and silent drift are normal. Operators need
                visibility and a path to reprocess.
              </p>
              <p>
                <span className="font-medium text-[--foreground]">Approach. </span>
                Adapter → map → validate → idempotent write, with bounded retries and a dead-letter
                queue for poison messages.
              </p>
              <p>
                <span className="font-medium text-[--foreground]">Tradeoff. </span>
                This demo simulates legacy timing and failures in-process so it can ship inside the
                portfolio — the patterns map to worker + SQL designs in production.
              </p>
            </div>
          </section>
        </div>
      ) : null}

      {tab === "runs" ? (
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="glass-card max-h-[32rem] space-y-2 overflow-y-auto p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[--muted-foreground]">
                Run history
              </p>
              <button
                type="button"
                onClick={() => refreshSnapshot()}
                className="rounded-md p-1 text-[--muted-foreground] hover:text-white"
                aria-label="Refresh runs"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
            {runs.length === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-[--muted-foreground]">
                No runs yet. Start a sync from Overview.
              </p>
            ) : (
              runs.map((run) => (
                <button
                  key={run.id}
                  type="button"
                  onClick={() => setActiveRun(run)}
                  className={cn(
                    "w-full rounded-lg border px-3 py-3 text-left transition-colors",
                    activeRun?.id === run.id
                      ? "border-[--foreground]/40 bg-[--muted]/50"
                      : "border-transparent hover:bg-[--muted]/30"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[--muted-foreground]">
                      {run.id.slice(0, 12)}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide",
                        runStatusClass(run.status)
                      )}
                    >
                      {run.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[--muted-foreground]">
                    {run.totals.succeeded}/{run.totals.total} ok · {run.totals.deadLettered} dlq
                  </p>
                </button>
              ))
            )}
          </aside>

          <section className="glass-card min-h-[20rem] p-5">
            {!activeRun ? (
              <div className="flex h-full min-h-[16rem] items-center justify-center text-sm text-[--muted-foreground]">
                Select a run to inspect pipeline steps.
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-[--muted-foreground]">{activeRun.id}</p>
                    <h2 className="mt-1 text-lg font-semibold capitalize">{activeRun.status}</h2>
                    <p className="mt-1 text-sm text-[--muted-foreground]">
                      Sources: {activeRun.sourceIds.join(", ")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Chip label={`${activeRun.totals.succeeded} succeeded`} />
                    <Chip label={`${activeRun.totals.deadLettered} dead-lettered`} />
                    <Chip label={`${activeRun.totals.pending} pending`} />
                  </div>
                </div>

                {(activeRun.status === "queued" || activeRun.status === "running") && (
                  <div className="h-1.5 overflow-hidden rounded-full bg-[--muted]">
                    <div
                      className="h-full rounded-full bg-[--foreground] transition-all duration-300"
                      style={{
                        width: `${Math.round(
                          ((activeRun.totals.total - activeRun.totals.pending) /
                            Math.max(activeRun.totals.total, 1)) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  {activeRun.records.map((record) => (
                    <article
                      key={record.id}
                      className="rounded-xl border border-[--border] bg-[--background]/50 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">
                            {record.externalId}{" "}
                            <span className="text-[--muted-foreground]">· {record.sourceId}</span>
                          </p>
                          <p className={cn("text-xs capitalize", outcomeClass(record.outcome))}>
                            {record.outcome.replace("_", " ")}
                            {record.attempts ? ` · ${record.attempts} attempt(s)` : ""}
                          </p>
                        </div>
                        {record.error ? (
                          <p className="max-w-md text-right text-xs text-amber-200">{record.error}</p>
                        ) : null}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {record.steps.map((step) => (
                          <span
                            key={`${record.id}-${step.name}`}
                            className={cn(
                              "rounded-md border px-2 py-1 text-[11px] capitalize",
                              stepClass(step.status)
                            )}
                            title={step.message}
                          >
                            {step.name}
                            {step.status === "retried" ? " ↻" : ""}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      ) : null}

      {tab === "dlq" ? (
        <section className="glass-card p-5">
          <div className="mb-4">
            <p className="section-label">Dead-letter queue</p>
            <h2 className="mt-1 text-lg font-semibold">Poison messages</h2>
            <p className="mt-1 text-sm text-[--muted-foreground]">
              Reprocess clears the injected failure mode for that source, then retries the record.
            </p>
          </div>
          {deadLetter.length === 0 ? (
            <p className="py-10 text-center text-sm text-[--muted-foreground]">
              Queue is empty. Inject a timeout or bad payload, then run a sync.
            </p>
          ) : (
            <div className="space-y-3">
              {deadLetter.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-[--border] bg-[--background]/40 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {item.externalId}{" "}
                        <span className="text-[--muted-foreground]">· {item.sourceId}</span>
                      </p>
                      <p className="text-xs text-amber-200">{item.error}</p>
                      <p className="text-xs text-[--muted-foreground]">
                        {item.status} · run {item.runId.slice(0, 12)} ·{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {item.status === "open" ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handleDeadLetter(item.id, "reprocess")}
                          className="btn-primary px-3 py-2 text-xs disabled:opacity-50"
                        >
                          Reprocess
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handleDeadLetter(item.id, "discard")}
                          className="btn-secondary px-3 py-2 text-xs disabled:opacity-50"
                        >
                          Discard
                        </button>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {tab === "reconcile" ? (
        <section className="glass-card p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="section-label">Reconciliation</p>
              <h2 className="mt-1 text-lg font-semibold">Source vs target</h2>
              <p className="mt-1 text-sm text-[--muted-foreground]">
                Compare canonical mapped source data against the Payout Ops store.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReconcile}
              disabled={busy}
              className="btn-secondary text-xs disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh report
            </button>
          </div>

          {!report ? (
            <p className="py-10 text-center text-sm text-[--muted-foreground]">
              Run a sync, then generate a reconcile report.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <Stat label="Matched" value={String(report.matched)} />
                <Stat label="Missing in target" value={String(report.missingInTarget)} />
                <Stat label="Missing in source" value={String(report.missingInSource)} />
                <Stat label="Drift" value={String(report.drift)} />
              </div>
              <div className="overflow-x-auto rounded-xl border border-[--border]">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[--muted]/40 text-xs uppercase tracking-wide text-[--muted-foreground]">
                    <tr>
                      <th className="px-3 py-2 font-medium">External ID</th>
                      <th className="px-3 py-2 font-medium">Source</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.diffs.map((diff) => (
                      <tr key={`${diff.sourceId}-${diff.externalId}`} className="border-t border-[--border]">
                        <td className="px-3 py-2 font-mono text-xs">{diff.externalId}</td>
                        <td className="px-3 py-2 text-[--muted-foreground]">{diff.sourceId}</td>
                        <td className="px-3 py-2 capitalize text-[--foreground]">
                          {diff.status.replaceAll("_", " ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.12em] text-[--muted-foreground]">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-[--border] px-2.5 py-1 text-[--muted-foreground]">
      {label}
    </span>
  );
}
