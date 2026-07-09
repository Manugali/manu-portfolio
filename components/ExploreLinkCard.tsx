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
      className="glass-card group block p-5 text-center transition-colors hover:border-[--muted-foreground]"
    >
      <p className="section-label mb-3">{label}</p>
      <Icon className="mx-auto mb-4 h-8 w-8 text-white" strokeWidth={1.5} />
      <h3 className="mb-2 text-lg font-semibold gradient-text">{title}</h3>
      <p className="text-sm leading-relaxed text-[--muted-foreground]">{description}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm text-white">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
