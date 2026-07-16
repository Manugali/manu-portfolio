"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderKanban, BookText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/experience", label: "Work", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/blog", label: "Blog", icon: BookText },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="site-header fixed bottom-0 left-0 right-0 z-[60] border-b-0 border-t pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Mobile navigation"
    >
      <div className={cn(SITE_CONTAINER, SITE_PADDING, "flex items-center justify-around py-1.5")}>
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1.5 py-2 text-[10px] transition-colors",
                active ? "text-white" : "text-[--muted-foreground]"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={active ? 2 : 1.5} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
