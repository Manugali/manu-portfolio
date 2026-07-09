"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ExperienceCard } from "@/components/ExperienceCard";
import { EducationCard } from "@/components/EducationCard";
import { WorkStats } from "@/components/WorkStats";
import { TechStack } from "@/components/TechStack";
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
        <header className="space-y-5 text-center">
          <p className="section-label">Professional Profile</p>
          <h1 className="text-3xl font-bold tracking-tight gradient-text sm:text-4xl">
            Work
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-medium text-white sm:text-base">
            {workProfile.headline}
          </p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[--muted-foreground]">
            {workProfile.summary}
          </p>
        </header>

        <section aria-label="Professional highlights">
          <WorkStats stats={workProfile.stats} />
        </section>

        <section className="space-y-6" aria-label="Professional experience">
          <div className="text-center sm:text-left">
            <p className="section-label mb-2">Career</p>
            <h2 className="text-2xl font-bold gradient-text">Experience</h2>
            <p className="mt-2 text-sm text-[--muted-foreground]">
              Enterprise software delivery in financial services — from architecture through deployment.
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((item, index) => (
              <ExperienceCard
                key={`${item.company}-${item.role}`}
                item={item}
                showTimeline
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-label="Education">
          <div className="text-center sm:text-left">
            <p className="section-label mb-2">Foundation</p>
            <h2 className="text-2xl font-bold gradient-text">Education</h2>
            <p className="mt-2 text-sm text-[--muted-foreground]">
              Graduate training in computer science from Texas Tech University.
            </p>
          </div>

          <div className="space-y-8">
            {education.map((item, index) => (
              <EducationCard
                key={item.institution}
                item={item}
                showTimeline
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6" aria-label="Core competencies">
          <div className="text-center sm:text-left">
            <p className="section-label mb-2">Capabilities</p>
            <h2 className="text-2xl font-bold gradient-text">Core Competencies</h2>
            <p className="mt-2 text-sm text-[--muted-foreground]">
              Technical skills and practices applied across enterprise development engagements.
            </p>
          </div>
          <TechStack />
        </section>

        <section
          className="glass-card p-6 text-center sm:p-8"
          aria-label="Contact call to action"
        >
          <p className="section-label mb-3">Next step</p>
          <h2 className="mb-3 text-xl font-bold gradient-text sm:text-2xl">
            Interested in working together?
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-[--muted-foreground]">
            I&apos;m open to full-time opportunities, consulting engagements, and
            enterprise software projects where reliability and integration matter.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-[--border] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[--muted-foreground]"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[--border] px-5 py-2.5 text-sm text-[--muted-foreground] transition-colors hover:border-[--muted-foreground] hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[--border] px-5 py-2.5 text-sm text-[--muted-foreground] transition-colors hover:border-[--muted-foreground] hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
