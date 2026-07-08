"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { CommandPalette } from "@/components/CommandPalette";
import { PageWrapper } from "@/components/PageWrapper";
import { Footer } from "@/components/Footer";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-[--foreground]">
      <SiteBackground subtle />
      <div className="relative z-10 mx-auto flex max-w-7xl">
        <Sidebar />
        <div className="flex-1 min-w-0 pb-20 md:pb-0">
          <Topbar variant="site" onOpenCommand={() => setOpen(true)} />
          <PageWrapper>
            <div className="px-4 md:px-6 pt-20 md:pt-28">{children}</div>
          </PageWrapper>
          <Footer />
        </div>
      </div>
      <MobileNav />
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  );
}
