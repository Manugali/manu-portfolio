import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useTransform(y, [-50, 50], [8, -8]);
  const ry = useTransform(x, [-50, 50], [-8, 8]);
  const rs = useSpring(1, { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-50, Math.min(50, px / 6)));
    y.set(Math.max(-50, Math.min(50, py / 6)));
    rs.set(1.01);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
    rs.set(1);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      style={{ rotateX: rx as any, rotateY: ry as any, scale: rs as any, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-2xl border border-[--border] overflow-hidden bg-[color-mix(in_oklch,oklch(var(--card))_70%,transparent)] backdrop-blur will-change-transform"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100" style={{
        background:
          "linear-gradient(120deg, rgba(59,130,246,0.25), rgba(34,211,238,0.2))",
        mask:
          "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
        WebkitMask:
          "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)"
      }} />
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <div className="flex items-center gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg p-2 hover:bg-muted"
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
                className="inline-flex rounded-lg p-2 hover:bg-muted"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-[--secondary] text-[--secondary-foreground] px-2.5 py-1 text-xs border border-[--border]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}


