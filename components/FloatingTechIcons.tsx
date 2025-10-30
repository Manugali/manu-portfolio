"use client";

import { motion } from "framer-motion";
import { 
  Atom, 
  Layers, 
  Type, 
  Server, 
  Database, 
  GitBranch,
  Code,
  Zap,
  Globe,
  Smartphone
} from "lucide-react";

const techIcons = [
  { Icon: Atom, name: "React", delay: 0 },
  { Icon: Layers, name: "Next.js", delay: 0.5 },
  { Icon: Type, name: "TypeScript", delay: 1 },
  { Icon: Server, name: "Node.js", delay: 1.5 },
  { Icon: Database, name: "Database", delay: 2 },
  { Icon: GitBranch, name: "Git", delay: 2.5 },
  { Icon: Code, name: "Code", delay: 3 },
  { Icon: Zap, name: "Performance", delay: 3.5 },
  { Icon: Globe, name: "Web", delay: 4 },
  { Icon: Smartphone, name: "Mobile", delay: 4.5 },
];

export function FloatingTechIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techIcons.map(({ Icon, name, delay }, index) => (
        <motion.div
          key={name}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: 8,
            delay: delay + index * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[color-mix(in_oklch,oklch(var(--card))_40%,transparent)] backdrop-blur border border-[--border]">
            <Icon className="h-4 w-4 text-[--primary]" />
            <span className="text-xs text-muted-foreground font-medium">{name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
