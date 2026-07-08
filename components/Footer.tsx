import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/Manugali", icon: Github, label: "GitHub", external: true },
  { href: "https://linkedin.com/in/manu", icon: Linkedin, label: "LinkedIn", external: true },
  { href: "mailto:manoharreddygali19061999@gmail.com", icon: Mail, label: "Email", external: false },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-12 py-6 px-4 border-t border-[--border]/60">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p
            className="text-lg font-bold lowercase gradient-text"
            style={{
              fontFamily:
                '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            manu
          </p>
          <p className="mt-1 text-xs text-[--muted-foreground]">
            © {new Date().getFullYear()} Manohar Gali. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[--border] text-[--muted-foreground] hover:text-white hover:border-[--muted-foreground] transition-colors"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
