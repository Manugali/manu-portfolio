"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Search } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const CONTENT_WIDTH =
  "mx-auto w-full max-w-lg lg:max-w-5xl xl:max-w-6xl";

type TopbarProps = {
  onOpenCommand?: () => void;
};

export function Topbar({ onOpenCommand }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const setThemeMode = (mode: "dark" | "light" | "system") => {
    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    } else {
      setTheme(mode);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full pt-3 px-3 lg:px-6">
      <div className={cn(CONTENT_WIDTH, "flex items-center justify-between gap-3")}>
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

        <div className="flex items-center gap-2">
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="h-9 w-9 rounded-full flex items-center justify-center border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_85%,transparent)] backdrop-blur-md text-[--muted-foreground] hover:text-white transition-colors"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          {mounted && (
            <div className="flex items-center rounded-full border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_85%,transparent)] backdrop-blur-md p-0.5">
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
                      "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                      isActive
                        ? "bg-[--muted] text-white"
                        : "text-[--muted-foreground] hover:text-white"
                    )}
                    aria-label={themeOption.label}
                    title={themeOption.label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { CONTENT_WIDTH };
