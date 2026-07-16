import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard, type Project } from "@/components/ProjectCard";
import projects from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected product and engineering projects — including LocalLaunch AI, a SaaS platform for generating editable local business websites.",
};

export default function ProjectsPage() {
  const items = projects as Project[];

  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          label="Projects"
          title="Things I've built"
          description="Real products and systems — not placeholder demos. Start with LocalLaunch AI, a SaaS platform for generating publish-ready local business websites."
        />

        <div className="grid gap-5">
          {items.map((project) => (
            <ProjectCard key={project.slug ?? project.title} project={project} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
