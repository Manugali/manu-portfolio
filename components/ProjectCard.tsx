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
    <div className="group rounded-lg border border-[--border] bg-[--card] overflow-hidden hover:border-[--muted-foreground] transition-colors">
      <div className="relative aspect-video overflow-hidden bg-[--muted]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">{project.title}</h3>
          <div className="flex items-center gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-[--muted-foreground] hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-[--muted-foreground] hover:text-white transition-colors"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-[--muted-foreground] leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-[--muted] text-[--muted-foreground] px-2.5 py-1 text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


