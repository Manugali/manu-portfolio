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
    <article className="glass-card p-5 text-left sm:p-6">
      <header className="mb-4 space-y-1">
        <h3 className="text-lg font-bold gradient-text">{item.institution}</h3>
        <p className="text-sm text-white">{item.focus}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[--muted-foreground]">
          <span>{item.period}</span>
          {item.location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
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
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white" />
            <span className="leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
