"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ExperienceCard } from "@/components/ExperienceCard";
import experience from "@/data/experience.json";

export default function ExperiencePage() {
  return (
    <AppShell>
      <main className="space-y-6">
        <PageHeader
          title="Experience"
          description="Building solutions that drive digital transformation and deliver measurable impact."
        />
        <div className="space-y-4">
          {experience.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${item.role}-${index}`}
              item={item}
            />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
