"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, Briefcase, BookText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/experience", label: "Work", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookText },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_90%,transparent)] backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div
        className={cn(
          SITE_CONTAINER,
          SITE_PADDING,
          "flex items-center justify-around py-2"
        )}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-medium transition-colors min-w-[56px]",
                active
                  ? "text-white"
                  : "text-[--muted-foreground] hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  active && "drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                )}
                strokeWidth={active ? 2 : 1.5}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
