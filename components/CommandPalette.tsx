"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (!e.ctrlKey && !e.metaKey && e.key === "/") {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] ${open ? "" : "pointer-events-none"}`}
      onClick={() => onOpenChange(false)}
    >
      <div className={`absolute inset-0 bg-black/50 transition ${open ? "opacity-100" : "opacity-0"}`} />
      <div
        className={`mx-auto mt-24 w-full max-w-xl px-4 transition ${open ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="Global Command Menu"
          className="rounded-2xl border border-[--border] bg-[--popover] text-[--popover-foreground] shadow-xl"
        >
          <Command.Input placeholder="Search sections or projects..." className="w-full px-4 py-3 text-sm outline-none bg-transparent" />
          <Command.List className="max-h-80 overflow-y-auto">
            <Command.Empty className="px-4 py-6 text-sm text-muted-foreground">No results found.</Command.Empty>
            <Command.Group heading="Navigate">
              {items.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    onOpenChange(false);
                    router.push(item.href);
                  }}
                  className="cursor-pointer px-4 py-2 text-sm aria-selected:bg-muted"
                >
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}


