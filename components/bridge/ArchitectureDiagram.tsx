"use client";

import { ArrowRight } from "lucide-react";

const sources = [
  { id: "hr", label: "Legacy HR", protocol: "SOAP" },
  { id: "policy", label: "Policy Admin", protocol: "Flat-file" },
  { id: "gl", label: "General Ledger", protocol: "REST" },
] as const;

const stages = ["Fetch", "Map", "Validate", "Write"] as const;

export function ArchitectureDiagram() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr] lg:items-center">
        <div className="space-y-2">
          {sources.map((source) => (
            <div
              key={source.id}
              className="rounded-lg border border-[--border] bg-[--card]/80 px-3 py-2"
            >
              <p className="text-sm font-medium text-[--foreground]">{source.label}</p>
              <p className="text-xs text-[--muted-foreground]">{source.protocol}</p>
            </div>
          ))}
        </div>

        <div className="hidden justify-center text-[--muted-foreground] lg:flex">
          <ArrowRight className="h-5 w-5" />
        </div>

        <div className="rounded-xl border border-[--border] bg-[--background]/70 p-4">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.14em] text-[--muted-foreground]">
            Legacy Bridge
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stages.map((stage) => (
              <div
                key={stage}
                className="rounded-md border border-[--border] px-2 py-3 text-center text-xs text-[--foreground]"
              >
                {stage}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-[--muted-foreground]">
            Retries · Dead-letter · Idempotent upserts
          </p>
        </div>

        <div className="hidden justify-center text-[--muted-foreground] lg:flex">
          <ArrowRight className="h-5 w-5" />
        </div>

        <div className="rounded-xl border border-[--border] bg-[--card]/80 px-4 py-5 text-center">
          <p className="text-sm font-medium text-[--foreground]">Payout Ops</p>
          <p className="mt-1 text-xs text-[--muted-foreground]">Canonical target store</p>
        </div>
      </div>
    </div>
  );
}
