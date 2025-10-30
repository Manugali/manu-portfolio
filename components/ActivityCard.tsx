"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

const commits = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  value: Math.round(10 + Math.sin(i / 2) * 8 + Math.random() * 6),
}));

const stars = Array.from({ length: 12 }, (_, i) => ({
  month: `M${i + 1}`,
  value: Math.round(50 + i * 8 + (Math.random() * 20 - 10)),
}));

const traffic = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  value: Math.round(200 + Math.cos(i) * 80 + Math.random() * 60),
}));

export function ActivityCard() {
  return (
    <div className="rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] p-5 backdrop-blur">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-2 text-sm text-muted-foreground">Commits (24h)</div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={commits} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" hide tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "oklch(0.208 0.042 265.755)", border: "1px solid oklch(1 0 0 / 10%)" }} labelStyle={{ color: "white" }} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#gradCommits)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className="mb-2 text-sm text-muted-foreground">Stars (12m)</div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stars} margin={{ left: -15, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "oklch(0.208 0.042 265.755)", border: "1px solid oklch(1 0 0 / 10%)" }} labelStyle={{ color: "white" }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="mb-2 text-sm text-muted-foreground">Traffic (7d)</div>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={traffic} margin={{ left: -20, right: 0, top: 5, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="oklch(0.704 0.04 256.788)" tick={{ fill: "oklch(0.704 0.04 256.788)" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "oklch(0.208 0.042 265.755)", border: "1px solid oklch(1 0 0 / 10%)" }} labelStyle={{ color: "white" }} />
                <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


