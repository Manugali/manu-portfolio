"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeLines = [
  "const portfolio = {",
  "  name: 'Manu',",
  "  role: 'Full-Stack Developer',",
  "  skills: ['React', 'Next.js', 'TypeScript'],",
  "  experience: '6+ years',",
  "  available: true",
  "};",
  "",
  "const buildApp = async () => {",
  "  const result = await createAmazingUI();",
  "  return optimizePerformance(result);",
  "};",
  "",
  "// Currently working on...",
  "const currentProject = 'AI-powered dashboard';",
  "const status = 'In development';",
];

export function LiveCodeSnippet() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setDisplayedLines(prev => [...prev, codeLines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      } else {
        // Reset after showing all lines
        setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLine(0);
        }, 3000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [currentLine]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-8 right-8 w-80 h-64 rounded-xl border border-[--border] bg-[color-mix(in_oklch,oklch(var(--card))_30%,transparent)] backdrop-blur p-4 font-mono text-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
          <span className="text-muted-foreground text-xs">portfolio.js</span>
        </div>
        <div className="space-y-1">
          {displayedLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[--foreground]"
            >
              {line === "" ? <br /> : (
                <span>
                  {line.startsWith("//") ? (
                    <span className="text-purple-400">{line}</span>
                  ) : line.includes("const") || line.includes("=") ? (
                    <>
                      <span className="text-blue-400">const</span>
                      <span className="text-[--foreground]">{line.replace("const", "")}</span>
                    </>
                  ) : line.includes("'") ? (
                    <>
                      <span className="text-[--foreground]">{line.split("'")[0]}</span>
                      <span className="text-yellow-300">'{line.split("'")[1]}'</span>
                      <span className="text-[--foreground]">{line.split("'")[2] || ""}</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              )}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-[--primary]"
          >
            ▋
          </motion.div>
        </div>
      </div>
    </div>
  );
}
