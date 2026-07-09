"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          title="Projects"
          description="Real builds and work highlights — curated with care, not placeholders."
        />

        <article className="glass-card p-8 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[--border] bg-[--muted]/40">
            <FolderKanban className="h-7 w-7 text-white" strokeWidth={1.5} />
          </div>

          <p className="section-label mb-3">Coming soon</p>
          <h2 className="text-2xl font-semibold gradient-text mb-4">
            Something worth showing
          </h2>
          <p className="mx-auto max-w-md text-sm text-[--muted-foreground] leading-relaxed">
            I&apos;m putting together case studies and side builds that reflect real
            work — no demo apps or filler projects. Check back soon, or reach out if
            you&apos;d like to hear about what I&apos;ve shipped in the meantime.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-lg border border-[--border] px-5 py-2.5 text-sm text-white transition-colors hover:border-[--muted-foreground]"
            >
              View experience
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-[--muted-foreground] transition-colors hover:text-white"
            >
              Get in touch
            </Link>
          </div>
        </article>
      </main>
    </AppShell>
  );
}
