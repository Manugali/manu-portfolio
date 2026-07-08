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
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookText },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-56 shrink-0 border-r border-[--border]/60 bg-[color-mix(in_oklch,oklch(var(--card))_40%,transparent)] backdrop-blur-sm">
      <div className="h-20 flex items-center px-5">
        <span
          className="text-sm font-bold lowercase bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-tight"
          style={{
            fontFamily:
              '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          portfolio
        </span>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                active
                  ? "bg-[--muted] text-white"
                  : "text-[--muted-foreground] hover:bg-[--muted]/60 hover:text-white"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-white" />
              )}
              <Icon className="h-4 w-4" strokeWidth={active ? 2 : 1.5} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
