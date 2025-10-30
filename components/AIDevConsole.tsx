"use client";

import * as React from "react";

const samples = [
  "> Initializing vector DB... done",
  "> Running build pipeline: lint → typecheck → test",
  "✓ 134 tests passed (6 skipped)",
  "> Deploying preview to Vercel... https://preview-abc123",
  "> Benchmark: p95 142ms, 1.2MB bundle, TTFB 38ms",
  "> AI suggest: inline memoization for expensive selector",
];

export function AIDevConsole() {
  const [lines, setLines] = React.useState<string[]>([]);
  const i = React.useRef(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, samples[i.current % samples.length]];
        i.current += 1;
        return next.slice(-8);
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-0 backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between border-b border-[--border] p-3 text-xs text-muted-foreground">
        <span>AI Dev Console</span>
        <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" /> live</span>
      </div>
      <div className="h-48 overflow-hidden bg-black/40 font-mono text-[12px] leading-relaxed">
        <div className="p-3">
          {lines.map((l, idx) => (
            <div key={idx} className="text-[--primary-foreground] text-opacity-90">
              <span className="text-teal-300">$</span> {l}
            </div>
          ))}
          <div className="mt-1 h-4 w-24 animate-pulse rounded bg-white/20" />
        </div>
      </div>
    </div>
  );
}


