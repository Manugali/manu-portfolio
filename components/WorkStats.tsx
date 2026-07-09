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
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card px-4 py-4 text-center sm:px-5 sm:py-5"
        >
          <p className="text-lg text-white sm:text-xl">{stat.value}</p>
          <p className="section-label mt-1 text-[10px] sm:text-xs">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
