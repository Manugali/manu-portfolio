import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-8 px-4 pb-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_65%,transparent)] p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Manu.dev</div>
          <div className="flex items-center gap-2">
            <a href="https://github.com/your-github" target="_blank" rel="noreferrer" className="relative inline-flex">
              <span className="absolute -inset-1 rounded-lg bg-sky-500/20 opacity-0 blur transition group-hover:opacity-100" />
              <Github className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer" className="relative inline-flex">
              <span className="absolute -inset-1 rounded-lg bg-teal-400/20 opacity-0 blur transition group-hover:opacity-100" />
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


