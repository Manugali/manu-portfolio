import { MapPin } from "lucide-react";
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
  detailed?: boolean;
  highlightLimit?: number;
};

export function ExperienceCard({
  item,
  compact = false,
  detailed = false,
  highlightLimit = 3,
}: ExperienceCardProps) {
  const useGroupedHighlights =
    !compact && item.highlightGroups && item.highlightGroups.length > 0;

  const flatHighlights = compact
    ? item.highlights.slice(0, highlightLimit)
    : item.highlights;

  const isLeftAligned = detailed;

  return (
    <article
      className={cn(
        "glass-card p-4 sm:p-6",
        isLeftAligned ? "text-left" : "text-center",
        compact ? "p-4" : "p-5"
      )}
    >
      <div className={cn(!isLeftAligned && !compact && "contents")}>
        <header className={cn("mb-4", !isLeftAligned && "flex flex-col gap-2 sm:gap-3")}>
          <div className={cn(isLeftAligned ? "space-y-2" : "")}>
            <div
              className={cn(
                "flex flex-wrap items-center gap-2",
                isLeftAligned ? "justify-start" : "justify-center"
              )}
            >
              <h3
                className={cn(
                  "font-semibold gradient-text",
                  isLeftAligned ? "text-xl" : "text-lg"
                )}
              >
                {item.role}
              </h3>
              {item.employmentType ? (
                <span className="rounded-full border border-[--border] bg-[--muted]/40 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[--muted-foreground]">
                  {item.employmentType}
                </span>
              ) : null}
            </div>
            <p
              className={cn(
                "text-sm",
                isLeftAligned ? "mt-1 text-white" : "mt-1 text-[--muted-foreground]"
              )}
            >
              {item.company}
            </p>
            <div
              className={cn(
                "flex flex-wrap gap-x-4 gap-y-1 text-sm text-[--muted-foreground]",
                isLeftAligned ? "mt-2" : "mt-1 flex-col items-center sm:items-center"
              )}
            >
              <span>{item.period}</span>
              {item.location ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1",
                    isLeftAligned ? "" : "justify-center"
                  )}
                >
                  {isLeftAligned ? <MapPin className="h-3.5 w-3.5 shrink-0" /> : null}
                  {item.location}
                </span>
              ) : null}
            </div>
          </div>
        </header>

        <p
          className={cn(
            "mb-5 text-sm leading-relaxed text-[--muted-foreground]",
            !isLeftAligned && "mb-4"
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
                !isLeftAligned && "justify-center"
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
          <ul className={cn("space-y-2", !isLeftAligned && "text-left")}>
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
