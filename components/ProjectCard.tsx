import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

export type Project = {
  slug?: string;
  title: string;
  description: string;
  image: string;
  stack: string[];
  demo?: string;
  repo?: string;
};

type ProjectCardProps = {
  project: Project;
};

function isInternalHref(href: string) {
  return href.startsWith("/");
}

export function ProjectCard({ project }: ProjectCardProps) {
  const caseStudyHref = project.slug ? `/projects/${project.slug}` : project.demo;
  const demoIsInternal = project.demo ? isInternalHref(project.demo) : false;

  return (
    <article className="group glass-card overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
      {caseStudyHref ? (
        <Link href={caseStudyHref} className="relative block aspect-video overflow-hidden bg-[--muted]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[--card] via-transparent to-transparent" />
        </Link>
      ) : (
        <div className="relative aspect-video overflow-hidden bg-[--muted]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[--card] via-transparent to-transparent" />
        </div>
      )}
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          {caseStudyHref ? (
            <Link href={caseStudyHref} className="text-lg font-semibold gradient-text hover:opacity-90">
              {project.title}
            </Link>
          ) : (
            <h3 className="text-lg font-semibold gradient-text">{project.title}</h3>
          )}
          <div className="flex shrink-0 items-center gap-1">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 text-[--muted-foreground] transition-colors hover:bg-[--muted] hover:text-white"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demo &&
              (demoIsInternal ? (
                <Link
                  href={project.demo}
                  className="rounded-lg p-2 text-[--muted-foreground] transition-colors hover:bg-[--muted] hover:text-white"
                  aria-label={`${project.title} case study`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-2 text-[--muted-foreground] transition-colors hover:bg-[--muted] hover:text-white"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-[--muted-foreground]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[--border] bg-[--muted]/40 px-2.5 py-1 text-xs text-[--muted-foreground] transition-colors group-hover:text-[--foreground]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
