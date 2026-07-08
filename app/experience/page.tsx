"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import experience from "@/data/experience.json";

export default function ExperiencePage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          title="Experience"
          description="Building solutions that drive digital transformation and deliver measurable impact."
        />
        <div className="space-y-6 max-w-4xl">
          {experience.map((item, index) => (
            <article
              key={`${item.company}-${item.role}-${index}`}
              className="glass-card p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold gradient-text">{item.role}</h2>
                  <p className="text-base text-[--muted-foreground] mt-1">{item.company}</p>
                  {item.location && (
                    <p className="text-sm text-[--muted-foreground] mt-1">{item.location}</p>
                  )}
                </div>
                <p className="text-sm text-[--muted-foreground] whitespace-nowrap">{item.period}</p>
              </div>
              <p className="text-sm md:text-base text-[--muted-foreground] mb-5 leading-relaxed">
                {item.summary}
              </p>
              <ul className="space-y-2.5">
                {item.highlights.map((highlight: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-sm text-[--muted-foreground] flex items-start gap-3"
                  >
                    <span className="text-white mt-1.5 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
