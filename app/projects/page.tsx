"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";
import { CommandPalette } from "@/components/CommandPalette";
import { PageWrapper } from "@/components/PageWrapper";
import { Footer } from "@/components/Footer";

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <div className="flex-1">
          <Topbar onOpenCommand={() => setOpen(true)} />
          <PageWrapper>
            <main className="p-4 md:p-6 space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h1>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <ProjectCard key={p.title} project={p} />
                ))}
              </div>
            </main>
          </PageWrapper>
          <CommandPalette open={open} onOpenChange={setOpen} />
          <Footer />
        </div>
      </div>
    </div>
  );
}


