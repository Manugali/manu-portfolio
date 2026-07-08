import { GraduationCap } from "lucide-react";

export type EducationItem = {
  institution: string;
  focus: string;
  period: string;
  highlights: string[];
};

type EducationCardProps = {
  item: EducationItem;
  showTimeline?: boolean;
  isLast?: boolean;
};

export function EducationCard({
  item,
  showTimeline = false,
  isLast = false,
}: EducationCardProps) {
  return (
    <article className={showTimeline ? "relative pl-8 sm:pl-10" : "glass-card p-5 sm:p-6"}>
      {showTimeline ? (
        <>
          <div
            className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[--border] bg-[--card]"
            aria-hidden
          >
            <GraduationCap className="h-3 w-3 text-white" strokeWidth={2} />
          </div>
          {!isLast ? (
            <div
              className="absolute left-[11px] top-7 bottom-0 w-px bg-[--border]"
              aria-hidden
            />
          ) : null}
        </>
      ) : null}

      <div className={showTimeline ? "glass-card p-5 text-left sm:p-6" : ""}>
        <header className="mb-4 space-y-1">
          <h3 className="text-lg font-bold gradient-text">{item.institution}</h3>
          <p className="text-sm text-white">{item.focus}</p>
          <p className="text-sm text-[--muted-foreground]">{item.period}</p>
        </header>

        <ul className="space-y-2.5">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-sm text-[--muted-foreground]"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white" />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
