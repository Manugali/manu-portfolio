import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

export type Project = {
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

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group glass-card overflow-hidden hover:scale-[1.01] transition-transform duration-300">
      <div className="relative aspect-video overflow-hidden bg-[--muted]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[--card] via-transparent to-transparent" />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold gradient-text">{project.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-[--muted-foreground] hover:text-white hover:bg-[--muted] transition-colors"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-[--muted-foreground] hover:text-white hover:bg-[--muted] transition-colors"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-[--muted-foreground] leading-relaxed line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[--border] bg-[--muted]/40 px-2.5 py-1 text-xs text-[--muted-foreground] group-hover:text-[--foreground] transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
