"use client";

import { AnimatedCounter } from "@/components/AnimatedCounter";

type WorkStat = {
  label: string;
  value: string;
};

type WorkStatsProps = {
  stats: WorkStat[];
};

export function WorkStats({ stats }: WorkStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass-card glass-card-static px-4 py-4 text-center sm:px-5 sm:py-5"
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <AnimatedCounter
            value={stat.value}
            className="text-lg tabular-nums text-white sm:text-xl"
          />
          <p className="section-label mt-1 text-[10px] sm:text-xs">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
