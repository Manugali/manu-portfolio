"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";
import { useScrolled } from "@/hooks/useScrolled";
import { useLoaderBlocking } from "@/components/InitialLoader";

const navLinks = [
  { href: "/experience", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function Topbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(8);
  const isLoading = useLoaderBlocking();

  return (
    <header
      className={cn(
        "site-header fixed left-0 right-0 top-0 z-[60] w-full",
        scrolled && "site-header-scrolled"
      )}
    >
      <div className={cn(SITE_CONTAINER, SITE_PADDING, "flex h-14 items-center justify-between")}>
        <Link
          id="site-logo"
          href="/"
          className={cn(
            "logo-text-gradient text-xl transition-all duration-500 hover:opacity-80 sm:text-2xl",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        >
          manu
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn("site-nav-link", active && "site-nav-link-active")}
              >
                {label}
              </Link>
            );
          })}
          <Link href="/resume" className="btn-secondary ml-2 px-3 py-2 text-xs">
            Resume
          </Link>
        </nav>

        <Link href="/contact" className="btn-secondary px-3 py-2 text-xs md:hidden">
          Contact
        </Link>
      </div>
    </header>
  );
}
