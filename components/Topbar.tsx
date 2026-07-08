"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const CONTENT_WIDTH =
  "mx-auto w-full max-w-lg lg:max-w-5xl xl:max-w-6xl";

export function Topbar() {
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
      </div>
    </header>
  );
}

export { CONTENT_WIDTH };
