"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import LightRays from "@/components/LightRays";

const LOADER_KEY = "manu-portfolio-loader-seen";
const ANIMATION_DURATION = 2400;

function WaveClipPath({
  progress,
  wavePhase,
  children,
}: {
  progress: number;
  wavePhase: number;
  children: React.ReactNode;
}) {
  const clipPath = useMemo(() => {
    const baseY = 100 - progress;
    const wavePoints: string[] = [];

    for (let x = 0; x <= 100; x += 2) {
      const wave1 = Math.sin(wavePhase * 0.15 + x * 0.15) * 10;
      const wave2 = Math.sin(wavePhase * 0.1 + x * 0.12) * 4;
      const wave3 = Math.sin(wavePhase * 0.06 + x * 0.08) * 2;
      const y = Math.max(0, baseY + wave1 + wave2 + wave3);
      wavePoints.push(`${x}% ${y}%`);
    }

    wavePoints.push("100% 100%", "0% 100%");
    return `polygon(${wavePoints.join(", ")})`;
  }, [progress, wavePhase]);

  return <div style={{ clipPath }}>{children}</div>;
}

function getLogoTarget() {
  const logo = document.getElementById("site-logo");
  const loaderLogo = document.getElementById("loader-logo");
  if (!logo || !loaderLogo) return null;

  const target = logo.getBoundingClientRect();
  const source = loaderLogo.getBoundingClientRect();

  const targetCx = target.left + target.width / 2;
  const targetCy = target.top + target.height / 2;
  const sourceCx = source.left + source.width / 2;
  const sourceCy = source.top + source.height / 2;

  return {
    x: targetCx - sourceCx,
    y: targetCy - sourceCy,
    scale: target.width / source.width,
  };
}

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(LOADER_KEY);
  });
  const [progress, setProgress] = useState(0);
  const [wavePhase, setWavePhase] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");
  const [target, setTarget] = useState({ x: 0, y: 0, scale: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    const startTime = Date.now();
    let frame: number;
    let done = false;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / ANIMATION_DURATION, 1);

      setWavePhase(elapsed * 0.004);

      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(eased * 100);

      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      if (done) return;
      done = true;
      setProgress(100);

      const mobile = window.innerWidth < 768;
      const logoTarget = getLogoTarget();
      if (logoTarget) setTarget(logoTarget);

      setPhase("exit");
      sessionStorage.setItem(LOADER_KEY, "1");

      setTimeout(() => setIsLoading(false), mobile ? 500 : 650);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[--background]"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.9}
              lightSpread={0.65}
              rayLength={1}
              followMouse={!isMobile}
              mouseInfluence={0.06}
              noiseAmount={0}
              distortion={0}
            />
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            animate={
              phase === "exit"
                ? isMobile
                  ? { opacity: 0, scale: 0.96 }
                  : {
                      opacity: 1,
                      x: target.x,
                      y: target.y,
                      scale: target.scale,
                    }
                : { opacity: 1, x: 0, y: 0, scale: 1 }
            }
            transition={{
              duration: phase === "exit" ? (isMobile ? 0.45 : 0.6) : 0,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div id="loader-logo" className="relative">
              <div className="logo-text text-5xl text-neutral-600 sm:text-6xl md:text-7xl">
                manu
              </div>
              <div className="logo-text absolute inset-0 overflow-hidden text-5xl text-white sm:text-6xl md:text-7xl">
                <WaveClipPath progress={progress} wavePhase={wavePhase}>
                  manu
                </WaveClipPath>
              </div>
            </div>

            <motion.p
              animate={{ opacity: phase === "exit" ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="section-label tabular-nums"
            >
              {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
