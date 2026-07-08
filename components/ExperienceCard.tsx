export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
};

type ExperienceCardProps = {
  item: ExperienceItem;
  compact?: boolean;
  highlightLimit?: number;
};

export function ExperienceCard({
  item,
  compact = false,
  highlightLimit = 3,
}: ExperienceCardProps) {
  const highlights = compact
    ? item.highlights.slice(0, highlightLimit)
    : item.highlights;

  return (
    <article className="glass-card p-4 text-center sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:gap-3">
        <div>
          <h3 className="text-lg font-bold gradient-text">{item.role}</h3>
          <p className="mt-1 text-sm text-[--muted-foreground]">{item.company}</p>
          {item.location ? (
            <p className="mt-1 text-sm text-[--muted-foreground]">{item.location}</p>
          ) : null}
        </div>
        <p className="text-sm text-[--muted-foreground]">{item.period}</p>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-[--muted-foreground]">
        {item.summary}
      </p>
      {highlights.length > 0 ? (
        <ul className="space-y-2 text-left">
          {highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs text-[--muted-foreground] sm:text-sm"
            >
              <span className="mt-1.5 shrink-0 text-white">•</span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
