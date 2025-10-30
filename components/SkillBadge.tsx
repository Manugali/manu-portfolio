type SkillBadgeProps = {
  label: string;
};

export function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="rounded-full bg-[color-mix(in_oklch,oklch(var(--secondary))_70%,transparent)] text-[--secondary-foreground] px-3 py-1 text-xs border border-[--border]">
      {label}
    </span>
  );
}


