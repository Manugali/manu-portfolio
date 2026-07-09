"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ExperienceCard } from "@/components/ExperienceCard";
import { EducationCard } from "@/components/EducationCard";
import { WorkStats } from "@/components/WorkStats";
import { TechStack } from "@/components/TechStack";
import { PageHeader } from "@/components/PageHeader";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import workProfile from "@/data/work-profile.json";
import { getSocialLinks } from "@/lib/social";
import { ArrowRight, Github, Mail } from "lucide-react";

export default function ExperiencePage() {
  const { email, github } = getSocialLinks();

  return (
    <AppShell>
      <main className="space-y-12">
        <PageHeader
          label="Profile"
          title="Work"
          description={workProfile.headline}
        />
        <p className="-mt-6 text-center text-sm leading-relaxed text-[--muted-foreground]">
          {workProfile.summary}
        </p>

        <WorkStats stats={workProfile.stats} />

        <section className="space-y-4">
          <h2 className="section-label">Experience</h2>
          {experience.map((item) => (
            <ExperienceCard key={`${item.company}-${item.role}`} item={item} detailed />
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="section-label">Education</h2>
          {education.map((item) => (
            <EducationCard key={item.institution} item={item} />
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="section-label">Skills</h2>
          <TechStack />
        </section>

        <section className="glass-card p-6 text-center sm:p-8">
          <h2 className="text-xl font-semibold">Let&apos;s work together</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[--muted-foreground]">
            Open to full-time opportunities and enterprise software projects.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`mailto:${email}`} className="btn-secondary">
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
