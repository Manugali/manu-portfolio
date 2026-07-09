"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-ghost mx-auto print:hidden">
      <Download className="h-4 w-4" strokeWidth={1.25} />
      Save as PDF
    </button>
  );
}
