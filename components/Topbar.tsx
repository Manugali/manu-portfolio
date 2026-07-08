"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Monitor,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const siteLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const socialLinks = [
  { href: "https://github.com/Manugali", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/manu", icon: Linkedin, label: "LinkedIn" },
] as const;

type TopbarProps = {
  variant?: "home" | "site";
  sections?: string[];
  currentSection?: number;
  onSelectSection?: (index: number) => void;
  onOpenCommand?: () => void;
};

export function Topbar({
  variant = "home",
  sections = ["About", "Skills", "Experience", "Contact"],
  currentSection = 0,
  onSelectSection,
  onOpenCommand,
}: TopbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setThemeMode = (mode: "dark" | "light" | "system") => {
    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    } else {
      setTheme(mode);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] w-full pt-3 px-3">
        <div className="w-full flex items-center justify-between gap-3">
          <Link
            href="/"
            className="font-bold text-2xl lowercase bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent shrink-0"
            style={{
              fontFamily:
                '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            manu
          </Link>

          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            className="h-9 w-9 rounded-full flex items-center justify-center border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_85%,transparent)] backdrop-blur-md text-[--muted-foreground] hover:text-white transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[58] bg-black/40 backdrop-blur-sm"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-3 top-[4.25rem] z-[59] rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_95%,transparent)] backdrop-blur-xl p-4 shadow-2xl max-w-lg mx-auto"
            >
              <nav className="flex flex-col gap-1">
                {variant === "home"
                  ? sections.map((section, idx) => (
                      <button
                        key={section}
                        onClick={() => {
                          onSelectSection?.(idx);
                          closeMenu();
                        }}
                        className={cn(
                          "rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                          currentSection === idx
                            ? "bg-[--muted] text-white"
                            : "text-[--muted-foreground] hover:bg-[--muted]/50 hover:text-white"
                        )}
                      >
                        {section}
                      </button>
                    ))
                  : siteLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={cn(
                          "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                          pathname === link.href
                            ? "bg-[--muted] text-white"
                            : "text-[--muted-foreground] hover:bg-[--muted]/50 hover:text-white"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
              </nav>

              {onOpenCommand && (
                <button
                  onClick={() => {
                    onOpenCommand();
                    closeMenu();
                  }}
                  className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-[--border] px-4 py-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
                >
                  <Search className="h-4 w-4" />
                  Search (⌘K)
                </button>
              )}

              <div className="h-px bg-[--border] my-3" />

              <div className="px-1 space-y-1">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[--foreground] hover:bg-[--muted] hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>

              {mounted && (
                <>
                  <div className="h-px bg-[--border] my-3" />
                  <div className="flex items-center justify-around py-1">
                    {[
                      { mode: "dark" as const, icon: Moon, label: "Dark mode" },
                      { mode: "system" as const, icon: Monitor, label: "System theme" },
                      { mode: "light" as const, icon: Sun, label: "Light mode" },
                    ].map((themeOption) => {
                      const Icon = themeOption.icon;
                      const isActive =
                        theme === themeOption.mode ||
                        (!theme && themeOption.mode === "system");
                      return (
                        <button
                          key={themeOption.mode}
                          onClick={() => setThemeMode(themeOption.mode)}
                          className={cn(
                            "p-2.5 rounded-lg transition-colors",
                            isActive
                              ? "bg-[--muted] text-white"
                              : "text-[--muted-foreground] hover:bg-[--muted] hover:text-white"
                          )}
                          aria-label={themeOption.label}
                          title={themeOption.label}
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
