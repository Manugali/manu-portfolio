"use client";

import { Topbar } from "@/components/Topbar";
import { PageWrapper } from "@/components/PageWrapper";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import { PAGE_VERTICAL, SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[--background] text-[--foreground]">
      <SiteBackground subtle />
      <div className={cn(SITE_CONTAINER, SITE_PADDING, "relative z-10 min-w-0")}>
        <Topbar />
        <PageWrapper>
          <div className={cn("mx-auto min-w-0 w-full max-w-2xl lg:max-w-3xl", PAGE_VERTICAL)}>
            {children}
          </div>
        </PageWrapper>
      </div>
      <MobileNav />
    </div>
  );
}
