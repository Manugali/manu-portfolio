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
import { ArrowRight, Briefcase, Download, Github, GraduationCap, Mail } from "lucide-react";

export default function ExperiencePage() {
  const { email, github } = getSocialLinks();

  return (
    <AppShell>
      <main className="space-y-12">
        <header className="space-y-5 text-center">
          <p className="section-number">Work</p>
          <h1 className="gradient-text-hero text-3xl font-semibold tracking-tight sm:text-4xl">
            Professional profile
          </h1>
          <div className="header-divider" />
          <p className="mx-auto max-w-2xl text-sm text-white sm:text-base">
            {workProfile.headline}
          </p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[--muted-foreground]">
            {workProfile.summary}
          </p>
          <Link href="/resume" className="btn-ghost mx-auto mt-2">
            <Download className="h-4 w-4" strokeWidth={1.25} />
            View resume
          </Link>
        </header>

        <section aria-label="Professional highlights">
          <WorkStats stats={workProfile.stats} />
        </section>

        <div className="section-divider" />

        <section className="space-y-6" aria-label="Professional experience">
          <div className="text-center sm:text-left">
            <p className="section-label mb-2">Career</p>
            <h2 className="flex items-center justify-center gap-2.5 text-2xl font-semibold gradient-text-soft sm:justify-start">
              <Briefcase className="h-5 w-5 shrink-0 text-white" strokeWidth={1.25} />
              Experience
            </h2>
            <p className="mt-2 text-sm text-[--muted-foreground]">
              Enterprise software delivery in financial services — from architecture through deployment.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((item) => (
              <ExperienceCard
                key={`${item.company}-${item.role}`}
                item={item}
                detailed
              />
            ))}
          </div>
        </section>

        <div className="section-divider" />

        <section className="space-y-6" aria-label="Education">
          <div className="text-center sm:text-left">
            <p className="section-label mb-2">Foundation</p>
            <h2 className="flex items-center justify-center gap-2.5 text-2xl font-semibold gradient-text-soft sm:justify-start">
              <GraduationCap className="h-5 w-5 shrink-0 text-white" strokeWidth={1.25} />
              Education
            </h2>
            <p className="mt-2 text-sm text-[--muted-foreground]">
              Graduate training in computer science from Texas Tech University.
            </p>
          </div>

          <div className="space-y-4">
            {education.map((item) => (
              <EducationCard key={item.institution} item={item} />
            ))}
          </div>
        </section>

        <div className="section-divider" />

        <section className="space-y-6" aria-label="Core competencies">
          <div className="text-center sm:text-left">
            <p className="section-label mb-2">Capabilities</p>
            <h2 className="text-2xl font-semibold gradient-text-soft">Core competencies</h2>
            <p className="mt-2 text-sm text-[--muted-foreground]">
              Technical skills and practices applied across enterprise development engagements.
            </p>
          </div>
          <TechStack />
        </section>

        <section
          className="glass-card glass-card-static p-6 text-center sm:p-8"
          aria-label="Contact call to action"
        >
          <p className="section-label mb-3">Next step</p>
          <h2 className="mb-3 text-xl font-semibold gradient-text-soft sm:text-2xl">
            Interested in working together?
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-[--muted-foreground]">
            I&apos;m open to full-time opportunities, consulting engagements, and
            enterprise software projects where reliability and integration matter.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Get in touch
              <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
            </Link>
            <a href={`mailto:${email}`} className="btn-ghost">
              <Mail className="h-4 w-4" strokeWidth={1.25} />
              Email me
            </a>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Github className="h-4 w-4" strokeWidth={1.25} />
              GitHub
            </a>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
