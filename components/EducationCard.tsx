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
      <header className="mb-4">
        <h3 className="text-lg font-semibold">{item.institution}</h3>
        <p className="mt-1 text-sm text-white">{item.focus}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[--muted-foreground]">
          <span>{item.period}</span>
          {item.location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
              {item.location}
            </span>
          ) : null}
        </div>
      </header>

      <ul className="space-y-2">
        {item.highlights.map((highlight) => (
          <li key={highlight} className="text-sm leading-relaxed text-[--muted-foreground]">
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}
