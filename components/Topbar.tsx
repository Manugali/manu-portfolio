"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, MoreVertical, Github, Linkedin, Monitor, Twitter, Dribbble } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TopbarProps = {
  sections?: string[];
  currentSection?: number;
  onSelectSection?: (index: number) => void;
  onOpenCommand?: () => void;
};

export function Topbar({ sections = ["About", "Skills", "Projects", "Contact"], currentSection = 0, onSelectSection, onOpenCommand }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Menu now opens/closes on hover, no need for click outside handler

  const setThemeMode = (mode: "dark" | "light" | "system") => {
    if (mode === "system") {
      // For system theme, detect and set
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    } else {
      setTheme(mode);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full pt-6 px-6">
      <div className="w-full flex items-center">
        {/* Logo - Center between left and middle */}
        <div 
          className="font-bold text-3xl md:text-4xl lowercase bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent absolute left-[18%] -translate-x-1/2" 
          style={{ 
            fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif', 
            fontWeight: 700, 
            letterSpacing: '-0.02em',
            backgroundImage: 'linear-gradient(to right, #ffffff, #e5e7eb, #ffffff)'
          }}
        >
          manu
        </div>

        {/* Navigation Container - Top Right */}
        <div className="rounded-2xl border border-[--border] bg-[--card] px-6 py-4 flex items-center gap-6 ml-auto mr-16">
          {/* Navigation + More Button */}
          <div className="flex items-center gap-6">
            {/* Navigation Links Container */}
            <nav className="hidden md:flex items-center gap-6 px-4 py-2 rounded-lg bg-[--muted]/30 backdrop-blur-sm">
              {sections.map((section, idx) => (
                <motion.button
                  key={section}
                  onClick={() => onSelectSection && onSelectSection(idx)}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                    transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1, ease: "easeOut" }
                  }}
                  className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 ease-out overflow-hidden cursor-pointer ${
                    currentSection === idx
                      ? 'text-white'
                      : 'text-[--muted-foreground] hover:text-white'
                  }`}
                >
                  <span className="relative z-10">
                    {section}
                  </span>
                  
                  {/* Animated gradient underline */}
                  {currentSection === idx && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  
                  {/* Hover underline effect for inactive items */}
                  {currentSection !== idx && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* More Button (Circular) */}
            <div 
              className="relative" 
              ref={menuRef}
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-8 w-8 rounded-full flex items-center justify-center text-[--muted-foreground] hover:text-white hover:bg-[--muted] transition-colors relative cursor-pointer"
                aria-label="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 mt-2 w-52 rounded-xl border border-[--border] bg-[--card] shadow-xl py-2 z-50 backdrop-blur-md"
                  >
                  {/* Social Links Section */}
                  <div className="px-2">
                    {[
                      { href: "https://github.com/Manugali", icon: Github, label: "Github" },
                      { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
                      { href: "https://dribbble.com", icon: Dribbble, label: "Dribbble" },
                      { href: "https://linkedin.com/in/manu", icon: Linkedin, label: "LinkedIn" }
                    ].map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                          whileHover={{ 
                            x: 4,
                            transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                          }}
                          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[--foreground] hover:bg-[--muted] hover:text-white transition-all duration-150 ease-out cursor-pointer"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <Icon className="h-4 w-4 transition-colors duration-150" />
                          </motion.div>
                          <motion.span
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                          >
                            {link.label}
                          </motion.span>
                        </motion.a>
                      );
                    })}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[--border] my-2" />

                  {/* Theme Options Section */}
                  {mounted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="px-2 flex items-center justify-around py-2 border-t border-[--border] mt-2 pt-2"
                    >
                      {[
                        { mode: "dark" as const, icon: Moon, label: "Dark mode" },
                        { mode: "system" as const, icon: Monitor, label: "System theme" },
                        { mode: "light" as const, icon: Sun, label: "Light mode" }
                      ].map((themeOption) => {
                        const Icon = themeOption.icon;
                        const isActive = theme === themeOption.mode || (!theme && themeOption.mode === "system");
                        return (
                          <motion.button
                            key={themeOption.mode}
                            onClick={() => setThemeMode(themeOption.mode)}
                            whileHover={{ 
                              scale: 1.2,
                              rotate: 8,
                              transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-2 rounded-lg transition-all duration-150 ease-out cursor-pointer ${
                              isActive
                                ? 'bg-[--muted] text-white'
                                : 'text-[--muted-foreground] hover:bg-[--muted] hover:text-white'
                            }`}
                            aria-label={themeOption.label}
                            title={themeOption.label}
                          >
                            <motion.div
                              animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              <Icon className="h-4 w-4" />
                            </motion.div>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


