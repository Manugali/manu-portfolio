import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import projects from "@/data/projects.json";

type ProjectRecord = {
  slug?: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  demo?: string;
  repo?: string;
};

const projectDetails: Record<
  string,
  {
    summary: string;
    role: string;
    outcomes: string[];
    highlights: string[];
  }
> = {
  "locallaunch-ai": {
    summary:
      "LocalLaunch AI is a production-oriented SaaS foundation for turning public business information into editable, publish-ready websites. The product focuses on original AI-generated copy, provenance tracking, approval gates for images and testimonials, and a structured visual editor instead of blind content scraping.",
    role: "Founder / full-stack engineer — product architecture, UX, generation pipeline, data model, and portfolio integration.",
    outcomes: [
      "End-to-end generation flow from business intake to editable site draft",
      "Approval-first publishing checklist for images, testimonials, and legal pages",
      "Monorepo-style architecture with shared packages for prompts, templates, and business logic",
      "Billing, lead capture, SEO, and deployment integration stubs ready for production wiring",
    ],
    highlights: [
      "Business enrichment with source confidence and provenance fields",
      "AI rewrite pipeline that generates original marketing copy from structured facts",
      "Premium theme presets and structured editor for section/copy customization",
      "Prisma domain model covering workspaces, projects, assets, subscriptions, and audit logs",
      "Typechecked, tested, and build-verified Next.js workspace",
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (projects as ProjectRecord[])
    .filter((project) => project.slug)
    .map((project) => ({ slug: project.slug as string }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = (projects as ProjectRecord[]).find((entry) => entry.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = (projects as ProjectRecord[]).find((entry) => entry.slug === slug);
  const details = projectDetails[slug];

  if (!project || !details) {
    notFound();
  }

  return (
    <AppShell>
      <main className="space-y-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[--muted-foreground] transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        <PageHeader label="Case study" title={project.title} description={project.description} />

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-[--border]">
          <Image
            src={project.image}
            alt={`${project.title} product cover`}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <Github className="h-4 w-4" />
              View source
            </a>
          ) : null}
          <Link href="/contact" className="btn-primary">
            Discuss this project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <section className="glass-card space-y-4 p-6">
          <p className="section-label">Overview</p>
          <p className="text-sm leading-7 text-[--muted-foreground]">{details.summary}</p>
          <p className="text-sm leading-7 text-[--muted-foreground]">
            <span className="font-medium text-white">Role: </span>
            {details.role}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="glass-card space-y-4 p-6">
            <p className="section-label">Outcomes</p>
            <ul className="space-y-3 text-sm leading-6 text-[--muted-foreground]">
              {details.outcomes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="glass-card space-y-4 p-6">
            <p className="section-label">Technical highlights</p>
            <ul className="space-y-3 text-sm leading-6 text-[--muted-foreground]">
              {details.highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="glass-card space-y-4 p-6">
          <p className="section-label">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[--border] bg-[--muted]/40 px-3 py-1.5 text-xs text-[--muted-foreground]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
