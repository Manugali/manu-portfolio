import { MapPin, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export type HighlightGroup = {
  category: string;
  items: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  employmentType?: string;
  summary: string;
  techStack?: string[];
  highlightGroups?: HighlightGroup[];
  highlights: string[];
};

type ExperienceCardProps = {
  item: ExperienceItem;
  compact?: boolean;
  highlightLimit?: number;
  showTimeline?: boolean;
  isLast?: boolean;
};

export function ExperienceCard({
  item,
  compact = false,
  highlightLimit = 3,
  showTimeline = false,
  isLast = false,
}: ExperienceCardProps) {
  const useGroupedHighlights =
    !compact && item.highlightGroups && item.highlightGroups.length > 0;

  const flatHighlights = compact
    ? item.highlights.slice(0, highlightLimit)
    : item.highlights;

  return (
    <article
      className={cn(
        "relative",
        showTimeline && "pl-8 sm:pl-10",
        !showTimeline && "glass-card p-4 text-center sm:p-6"
      )}
    >
      {showTimeline ? (
        <>
          <div
            className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[--border] bg-[--card]"
            aria-hidden
          >
            <Briefcase className="h-3 w-3 text-white" strokeWidth={2} />
          </div>
          {!isLast ? (
            <div
              className="absolute left-[11px] top-7 bottom-0 w-px bg-[--border]"
              aria-hidden
            />
          ) : null}
        </>
      ) : null}

      <div
        className={cn(
          showTimeline && "glass-card p-5 text-left sm:p-6",
          !showTimeline && "contents"
        )}
      >
        <header className={cn("mb-4", !showTimeline && "flex flex-col gap-2 sm:gap-3")}>
          <div className={cn(showTimeline ? "space-y-2" : "")}>
            <div
              className={cn(
                "flex flex-wrap items-center gap-2",
                showTimeline ? "justify-start" : "justify-center"
              )}
            >
              <h3
                className={cn(
                  "font-bold gradient-text",
                  showTimeline ? "text-xl" : "text-lg"
                )}
              >
                {item.role}
              </h3>
              {item.employmentType ? (
                <span className="rounded-full border border-[--border] bg-[--muted]/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[--muted-foreground]">
                  {item.employmentType}
                </span>
              ) : null}
            </div>
            <p
              className={cn(
                "text-sm font-medium text-white",
                showTimeline ? "mt-1" : "mt-1 text-[--muted-foreground]"
              )}
            >
              {item.company}
            </p>
            <div
              className={cn(
                "flex flex-wrap gap-x-4 gap-y-1 text-sm text-[--muted-foreground]",
                showTimeline ? "mt-2" : "mt-1 flex-col items-center sm:items-center"
              )}
            >
              <span>{item.period}</span>
              {item.location ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1",
                    showTimeline ? "" : "justify-center"
                  )}
                >
                  {showTimeline ? <MapPin className="h-3.5 w-3.5 shrink-0" /> : null}
                  {item.location}
                </span>
              ) : null}
            </div>
          </div>
        </header>

        <p
          className={cn(
            "mb-5 text-sm leading-relaxed text-[--muted-foreground]",
            !showTimeline && "mb-4"
          )}
        >
          {item.summary}
        </p>

        {item.techStack && item.techStack.length > 0 ? (
          <div className={cn("mb-5", compact && "mb-4")}>
            {!compact ? (
              <p className="section-label mb-3">Technologies</p>
            ) : null}
            <div
              className={cn(
                "flex flex-wrap gap-2",
                !showTimeline && "justify-center"
              )}
            >
              {(compact ? item.techStack.slice(0, 4) : item.techStack).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[--border] bg-[--muted]/40 px-2.5 py-1 text-xs text-[--foreground]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {useGroupedHighlights ? (
          <div className="space-y-5">
            {item.highlightGroups!.map((group) => (
              <div key={group.category}>
                <p className="section-label mb-3">{group.category}</p>
                <ul className="space-y-2.5">
                  {group.items.map((highlight) => (
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
            ))}
          </div>
        ) : flatHighlights.length > 0 ? (
          <ul className={cn("space-y-2", !showTimeline && "text-left")}>
            {flatHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-xs text-[--muted-foreground] sm:text-sm"
              >
                <span className="mt-1.5 shrink-0 text-white">•</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
