"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";
import { useScrolled } from "@/hooks/useScrolled";

const navLinks = [
  { href: "/experience", label: "Work" },
  { href: "/blog", label: "Notes" },
  { href: "/contact", label: "Contact" },
] as const;

export function Topbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <header className="fixed left-0 right-0 top-0 z-[60] w-full pt-3">
      <div
        className={cn(
          SITE_CONTAINER,
          SITE_PADDING,
          "flex items-center justify-between gap-3"
        )}
      >
        <Link
          href="/"
          className="logo-text-gradient shrink-0 text-2xl transition-opacity hover:opacity-80 sm:text-3xl"
        >
          manu
        </Link>

        <nav
          className={cn("nav-pill hidden md:flex", scrolled && "nav-pill-scrolled")}
          aria-label="Main navigation"
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn("nav-link", active && "nav-link-active")}
              >
                {label}
              </Link>
            );
          })}
          <Link href="/resume" className="btn-ghost ml-1 px-3 py-1.5 text-xs">
            Resume
          </Link>
        </nav>

        <Link
          href="/contact"
          className="btn-ghost hidden shrink-0 px-3 py-2 text-xs sm:inline-flex md:hidden"
        >
          Let&apos;s talk
        </Link>
      </div>
    </header>
  );
}
