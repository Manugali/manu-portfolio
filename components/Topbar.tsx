"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  MoreVertical,
  Github,
  Linkedin,
  Monitor,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState, useRef, useSyncExternalStore } from "react";
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const setThemeMode = (mode: "dark" | "light" | "system") => {
    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    } else {
      setTheme(mode);
    }
    setIsMenuOpen(false);
  };

  const navItems =
    variant === "home"
      ? sections.map((section, idx) => ({
          key: section,
          label: section,
          active: currentSection === idx,
          onClick: () => onSelectSection?.(idx),
        }))
      : siteLinks.map((link) => ({
          key: link.href,
          label: link.label,
          active: pathname === link.href,
          href: link.href,
        }));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] w-full pt-3 md:pt-6 px-3 md:px-6">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-2xl md:text-3xl lg:text-4xl lowercase bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent relative md:absolute md:left-[18%] md:-translate-x-1/2"
            style={{
              fontFamily:
                '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            manu
          </Link>

          <div className="rounded-xl md:rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_85%,transparent)] backdrop-blur-md px-3 md:px-6 py-2 md:py-4 flex items-center gap-2 md:gap-4 ml-auto md:mr-16">
            <nav className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-[--muted]/30">
              {navItems.map((item) =>
                "href" in item && item.href ? (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                      item.active
                        ? "text-white"
                        : "text-[--muted-foreground] hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <motion.button
                    key={item.key}
                    onClick={"onClick" in item ? item.onClick : undefined}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                      item.active
                        ? "text-white"
                        : "text-[--muted-foreground] hover:text-white"
                    )}
                  >
                    {item.label}
                  </motion.button>
                )
              )}
            </nav>

            {onOpenCommand && (
              <button
                onClick={onOpenCommand}
                className="hidden md:flex items-center gap-2 rounded-lg border border-[--border] px-2.5 py-1.5 text-xs text-[--muted-foreground] hover:text-white hover:border-[--muted-foreground] transition-colors"
                aria-label="Open command palette"
              >
                <Search className="h-3.5 w-3.5" />
                <span>⌘K</span>
              </button>
            )}

            <button
              onClick={() => setIsMobileNavOpen((open) => !open)}
              className="md:hidden h-8 w-8 rounded-full flex items-center justify-center text-[--muted-foreground] hover:text-white hover:bg-[--muted] transition-colors"
              aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileNavOpen}
            >
              {isMobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <div
              className="relative hidden md:block"
              ref={menuRef}
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-8 w-8 rounded-full flex items-center justify-center text-[--muted-foreground] hover:text-white hover:bg-[--muted] transition-colors cursor-pointer"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </motion.button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 mt-2 w-52 rounded-xl border border-[--border] bg-[--card] shadow-xl py-2 z-50 backdrop-blur-md"
                  >
                    <div className="px-2">
                      {socialLinks.map((link, index) => {
                        const Icon = link.icon;
                        return (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.2 }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[--foreground] hover:bg-[--muted] hover:text-white transition-colors"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{link.label}</span>
                          </motion.a>
                        );
                      })}
                    </div>

                    {mounted && (
                      <>
                        <div className="h-px bg-[--border] my-2" />
                        <div className="px-2 flex items-center justify-around py-2">
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
                                  "p-2 rounded-lg transition-colors",
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
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 top-[4.5rem] z-[59] md:hidden rounded-2xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_95%,transparent)] backdrop-blur-xl p-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-1">
              {variant === "home"
                ? sections.map((section, idx) => (
                    <button
                      key={section}
                      onClick={() => {
                        onSelectSection?.(idx);
                        setIsMobileNavOpen(false);
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
                  setIsMobileNavOpen(false);
                }}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl border border-[--border] px-4 py-3 text-sm text-[--muted-foreground] hover:text-white transition-colors"
              >
                <Search className="h-4 w-4" />
                Search (⌘K)
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
