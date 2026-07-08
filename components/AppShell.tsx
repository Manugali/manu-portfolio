"use client";

import { Topbar } from "@/components/Topbar";
import { PageWrapper } from "@/components/PageWrapper";
import { Footer } from "@/components/Footer";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen text-[--foreground]">
      <SiteBackground subtle />
      <div className="relative z-10 mx-auto w-full max-w-lg lg:max-w-5xl xl:max-w-6xl">
        <Topbar />
        <PageWrapper>
          <div className="px-4 pt-[4.5rem] pb-24">{children}</div>
        </PageWrapper>
        <Footer />
      </div>
      <MobileNav />
    </div>
  );
}
