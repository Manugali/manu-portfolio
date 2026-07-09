import { MapPin } from "lucide-react";

export type EducationItem = {
  institution: string;
  focus: string;
  period: string;
  location?: string;
  highlights: string[];
};

type EducationCardProps = {
  item: EducationItem;
};

export function EducationCard({ item }: EducationCardProps) {
  return (
    <article className="glass-card glass-card-static p-5 text-left sm:p-6">
      <header className="mb-4 space-y-1">
        <h3 className="text-lg font-semibold gradient-text-soft">{item.institution}</h3>
        <p className="text-sm text-white">{item.focus}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[--muted-foreground]">
          <span>{item.period}</span>
          {item.location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.25} />
              {item.location}
            </span>
          ) : null}
        </div>
      </header>

      <ul className="space-y-2.5">
        {item.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-3 text-sm text-[--muted-foreground]"
          >
            <span className="list-dash mt-0.5 text-xs" />
            <span className="leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
