"use client";

import { Topbar } from "@/components/Topbar";
import { PageWrapper } from "@/components/PageWrapper";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/lib/utils";
import { PAGE_VERTICAL, SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";
import { getSocialLinks } from "@/lib/social";
import Link from "next/link";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { github } = getSocialLinks();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[--foreground]">
      <SiteBackground subtle />
      <div className={cn(SITE_CONTAINER, SITE_PADDING, "relative z-10 min-w-0")}>
        <Topbar />
        <PageWrapper>
          <div className={cn("mx-auto min-w-0 w-full max-w-2xl lg:max-w-3xl", PAGE_VERTICAL)}>
            {children}
          </div>
        </PageWrapper>
        <footer className="pb-28 pt-4 text-center print:hidden">
          <p className="text-[10px] text-[--muted-subtle]">
            Built with Next.js ·{" "}
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[--muted-foreground] hover:text-white"
            >
              GitHub
            </Link>
          </p>
        </footer>
      </div>
      <MobileNav />
    </div>
  );
}
