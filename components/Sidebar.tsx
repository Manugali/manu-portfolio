"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  FolderKanban,
  Briefcase,
  Mail,
  BookText,
} from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookText },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-[--border] bg-[--sidebar] text-[--sidebar-foreground] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklch,oklch(var(--sidebar))_75%,transparent)]">
      <div className="h-16 flex items-center px-4 text-lg font-semibold tracking-tight">
        <span className="relative inline-flex items-center">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-teal-300 shadow-[0_0_20px_rgba(56,189,248,0.8)]" />
          Manu.dev
        </span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2 transition",
                active
                  ? "bg-[--sidebar-accent] text-[--sidebar-accent-foreground]"
                  : "hover:bg-[--sidebar-accent] hover:text-[--sidebar-accent-foreground]"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-sky-400 to-teal-300" />
              )}
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 text-xs text-muted-foreground">v1.0</div>
    </aside>
  );
}


