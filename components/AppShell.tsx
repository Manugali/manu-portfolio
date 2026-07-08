"use client";

import { useState } from "react";
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
      <div className="relative z-10 mx-auto max-w-lg w-full">
        <Topbar variant="site" onOpenCommand={() => setOpen(true)} />
        <PageWrapper>
          <div className="px-4 pt-[4.5rem] pb-24">{children}</div>
        </PageWrapper>
        <Footer />
      </div>
      <MobileNav />
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  );
}
