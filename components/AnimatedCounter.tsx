"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
  value: string;
  className?: string;
};

function parseValue(raw: string): { prefix: string; num: number; suffix: string } | null {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || !parsed || prefersReducedMotion) {
      return;
    }

    const duration = 1200;
    const start = performance.now();
    const target = parsed.num;
    const isFloat = value.includes(".");

    let frame: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      const formatted = isFloat ? current.toFixed(1) : Math.round(current).toString();
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, parsed, prefersReducedMotion, value]);

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {display}
    </motion.p>
  );
}
