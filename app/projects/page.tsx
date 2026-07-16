"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";
import projects from "@/data/projects.json";

export default function ProjectsPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          label="Projects"
          title="Case studies"
          description="Interactive labs and write-ups that show how I approach enterprise integration work."
        />

        <div className="space-y-4">
          {projects.map((project) => (
            <article key={project.href} className="glass-card space-y-4 p-6 sm:p-8">
              <div className="space-y-2">
                <p className="section-label">Interactive lab</p>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {project.title}
                </h2>
                <p className="text-sm leading-relaxed text-[--muted-foreground] sm:text-base">
                  {project.description}
                </p>
                <p className="text-sm leading-relaxed text-[--foreground]/90">
                  {project.outcome}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>

              <Link href={project.href} className="btn-primary">
                Open simulator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
