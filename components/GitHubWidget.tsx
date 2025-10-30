"use client";

import * as React from "react";

type Stats = { user: string; stars: number; commits24h: number };

export function GitHubWidget({ user }: { user?: string }) {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      const res = await fetch(`/api/github/stats?user=${encodeURIComponent(user || "")}`, { cache: "no-store" });
      const json = await res.json();
      setStats(json);
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    }
  }

  React.useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [user]);

  return (
    <div className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-5 backdrop-blur">
      <div className="text-sm text-muted-foreground">GitHub (live)</div>
      {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-muted-foreground">Stars</div>
          <div className="text-2xl font-semibold">{stats?.stars ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Commits (24h)</div>
          <div className="text-2xl font-semibold">{stats?.commits24h ?? "—"}</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">User: {stats?.user || user || process.env.NEXT_PUBLIC_GITHUB_USER || "your-github"}</div>
    </div>
  );
}


