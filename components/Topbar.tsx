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
          className="text-xl font-semibold tracking-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent shrink-0"
        >
          manu
        </Link>
      </div>
    </header>
  );
}
