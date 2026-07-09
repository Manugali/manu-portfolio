import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type ExploreLinkCardProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
};

export function ExploreLinkCard({
  href,
  icon: Icon,
  label,
  title,
  description,
}: ExploreLinkCardProps) {
  return (
    <Link
      href={href}
      className="glass-card explore-card group block p-5 text-center"
    >
      <p className="section-label mb-3">{label}</p>
      <div className="icon-container mx-auto mb-4 h-12 w-12">
        <Icon className="h-6 w-6 text-white" strokeWidth={1.25} />
      </div>
      <h3 className="mb-2 text-lg font-semibold gradient-text-soft">{title}</h3>
      <p className="text-sm leading-relaxed text-[--muted-foreground]">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm text-white">
        Explore
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          strokeWidth={1.25}
        />
      </span>
    </Link>
  );
}
