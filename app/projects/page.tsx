"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <AppShell>
      <main className="space-y-8">
        <PageHeader
          label="Projects"
          title="Case studies"
          description="Detailed write-ups are on the way. In the meantime, my professional work speaks through the experience page."
        />

        <article className="glass-card space-y-4 p-8 text-center">
          <p className="text-sm leading-relaxed text-[--muted-foreground]">
            I&apos;m preparing case studies from real enterprise work — integration projects,
            internal platforms, and .NET systems in production. No placeholder demos.
          </p>
          <Link href="/experience" className="btn-primary mx-auto">
            View experience instead
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </main>
    </AppShell>
  );
}
