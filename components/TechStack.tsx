import skills from "@/data/skills.json";

export function TechStack() {
  return (
    <div className="grid gap-4">
      {skills.categories.map((category) => (
        <div key={category.name} className="glass-card p-6">
          <h3 className="section-label mb-4">{category.name}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span key={skill} className="tag px-3 py-1.5">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
