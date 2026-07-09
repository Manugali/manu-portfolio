"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONTAINER, SITE_PADDING } from "@/lib/layout";

export function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] w-full pt-3">
      <div className={cn(SITE_CONTAINER, SITE_PADDING, "flex items-center justify-center")}>
        <Link
          href="/"
          className="logo-text-gradient text-2xl shrink-0 transition-opacity hover:opacity-80 sm:text-3xl"
        >
          manu
        </Link>
      </div>
    </header>
  );
}
