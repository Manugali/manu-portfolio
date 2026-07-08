"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";

export default function ProjectsPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          title="Projects"
          description="A selection of applications and systems I've built — from enterprise integrations to modern web experiences."
        />
        <div className="grid gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
