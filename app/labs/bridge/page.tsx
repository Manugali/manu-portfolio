"use client";

import { Topbar } from "@/components/Topbar";
import { SiteBackground } from "@/components/SiteBackground";
import { MobileNav } from "@/components/MobileNav";
import { BridgeConsole } from "@/components/bridge/BridgeConsole";
import { cn } from "@/lib/utils";
import { PAGE_VERTICAL, SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

export default function LegacyBridgePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[--background] text-[--foreground]">
      <SiteBackground subtle />
      <div className={cn(SITE_CONTAINER, SITE_PADDING, "relative z-10 min-w-0")}>
        <Topbar />
        <main className={cn("mx-auto min-w-0 w-full max-w-5xl", PAGE_VERTICAL)}>
          <BridgeConsole />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
