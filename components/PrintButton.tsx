"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-secondary print-hidden">
      <Download className="h-4 w-4" />
      Save as PDF
    </button>
  );
}
