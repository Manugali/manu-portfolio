"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, FolderKanban } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          sectionNumber="Projects"
          title="Selected work"
          description="Real builds and work highlights — curated with care, not placeholders."
        />

        <article className="glass-card glass-card-static p-8 text-center">
          <div className="icon-container mx-auto mb-6 h-14 w-14">
            <FolderKanban className="h-7 w-7 text-white" strokeWidth={1.25} />
          </div>

          <p className="section-label mb-3">Coming soon</p>
          <h2 className="mb-4 text-2xl font-semibold gradient-text-soft">
            Something worth showing
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-[--muted-foreground]">
            I&apos;m putting together case studies and side builds that reflect real
            work — no demo apps or filler projects. Check back soon, or reach out if
            you&apos;d like to hear about what I&apos;ve shipped in the meantime.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/experience" className="btn-primary">
              View experience
              <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Get in touch
            </Link>
          </div>
        </article>
      </main>
    </AppShell>
  );
}
