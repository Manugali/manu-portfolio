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
        "glass-card p-5 sm:p-6",
        isLeftAligned ? "text-left" : "text-center",
        compact && "p-5"
      )}
    >
      <header className="mb-4">
        <div
          className={cn(
            "flex flex-wrap items-center gap-2",
            isLeftAligned ? "justify-start" : "justify-center"
          )}
        >
          <h3 className={cn("font-semibold", isLeftAligned ? "text-xl" : "text-lg")}>
            {item.role}
          </h3>
          {item.employmentType ? (
            <span className="tag text-[10px] uppercase tracking-wider">{item.employmentType}</span>
          ) : null}
        </div>
        <p className={cn("mt-1 text-sm", isLeftAligned ? "text-white" : "text-[--muted-foreground]")}>
          {item.company}
        </p>
        <div
          className={cn(
            "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[--muted-foreground]",
            !isLeftAligned && "justify-center"
          )}
        >
          <span>{item.period}</span>
          {item.location ? (
            <span className="inline-flex items-center gap-1">
              {isLeftAligned ? <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> : null}
              {item.location}
            </span>
          ) : null}
        </div>
      </header>

      <p className="mb-4 text-sm leading-relaxed text-[--muted-foreground]">{item.summary}</p>

      {item.techStack && item.techStack.length > 0 ? (
        <div className={cn("mb-4", detailed && "mb-5")}>
          {!compact ? <p className="section-label mb-3">Technologies</p> : null}
          <div className={cn("flex flex-wrap gap-2", !isLeftAligned && "justify-center")}>
            {(compact ? item.techStack.slice(0, 4) : item.techStack).map((tech) => (
              <span key={tech} className="tag">
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
              <ul className="space-y-2">
                {group.items.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-sm leading-relaxed text-[--muted-foreground]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : flatHighlights.length > 0 ? (
        <ul className={cn("space-y-2", !isLeftAligned && "text-left")}>
          {flatHighlights.map((highlight) => (
            <li key={highlight} className="text-sm leading-relaxed text-[--muted-foreground]">
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
