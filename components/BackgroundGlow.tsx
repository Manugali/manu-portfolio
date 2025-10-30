"use client";

import { motion } from "framer-motion";

export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_0%_0%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(600px_300px_at_100%_20%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(700px_350px_at_50%_120%,rgba(99,102,241,0.10),transparent_60%)]" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "conic-gradient(from 90deg, rgba(59,130,246,0.15), rgba(34,211,238,0.15), transparent)" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />
    </div>
  );
}


