import skills from "@/data/skills.json";

export function TechStack() {
  return (
    <div className="grid gap-4">
      {skills.categories.map((category) => (
        <div key={category.name} className="glass-card p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[--muted-foreground] mb-4">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[--border] bg-[--muted]/50 px-3 py-1.5 text-xs text-[--foreground] transition-colors hover:border-[--muted-foreground] hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
