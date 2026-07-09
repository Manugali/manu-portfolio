"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "@/components/LightRays";

const LOADER_KEY = "manu-portfolio-loader-seen";
const FILL_DURATION = 2400;
const EXIT_DURATION = 550;
const MAX_LOADER_MS = 6000;

type LoaderContextValue = {
  isLoading: boolean;
};

const LoaderContext = createContext<LoaderContextValue>({ isLoading: false });

export function useLoaderBlocking() {
  return useContext(LoaderContext).isLoading;
}

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

function measureLogoHandoff() {
  const logo = document.getElementById("site-logo");
  const loaderLogo = document.getElementById("loader-logo");
  if (!logo || !loaderLogo) return null;

  const target = logo.getBoundingClientRect();
  const source = loaderLogo.getBoundingClientRect();
  if (target.width === 0 || source.width === 0) return null;

  return {
    x: target.left + target.width / 2 - (source.left + source.width / 2),
    y: target.top + target.height / 2 - (source.top + source.height / 2),
    scale: target.width / source.width,
  };
}

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wavePhase, setWavePhase] = useState(0);
  const [phase, setPhase] = useState<"fill" | "exit">("fill");
  const [handoff, setHandoff] = useState({ x: 0, y: 0, scale: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  const fillFrame = useRef<number | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(LOADER_KEY, "1");
    document.body.style.overflow = "";
    setShowLoader(false);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(LOADER_KEY)) {
      return;
    }

    let cancelled = false;

    const begin = () => {
      if (cancelled) return;

      setShowLoader(true);
      document.body.style.overflow = "hidden";

      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      safetyTimer.current = setTimeout(() => {
        if (!cancelled) dismiss();
      }, MAX_LOADER_MS);

      const start = Date.now();

      const tick = () => {
        if (cancelled) return;

        const elapsed = Date.now() - start;
        const t = Math.min(elapsed / FILL_DURATION, 1);
        setWavePhase(elapsed * 0.004);

        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        setProgress(eased * 100);

        if (t < 1) {
          fillFrame.current = requestAnimationFrame(tick);
          return;
        }

        setProgress(100);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cancelled) return;
            const target = measureLogoHandoff();
            if (target) setHandoff(target);
            setPhase("exit");
            exitTimer.current = setTimeout(dismiss, EXIT_DURATION + 100);
          });
        });
      };

      fillFrame.current = requestAnimationFrame(tick);
    };

    const startId = requestAnimationFrame(begin);

    return () => {
      cancelled = true;
      cancelAnimationFrame(startId);
      if (fillFrame.current) cancelAnimationFrame(fillFrame.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      document.body.style.overflow = "";
    };
  }, [dismiss]);

  return (
    <LoaderContext.Provider value={{ isLoading: showLoader }}>
      {children}

      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="site-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]"
            role="status"
            aria-live="polite"
            aria-label="Loading site"
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{ opacity: phase === "exit" ? 0 : 1 }}
              transition={{ duration: EXIT_DURATION / 1000, ease: "easeOut" }}
              aria-hidden
            >
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
            </motion.div>

            <motion.div
              className="relative z-10 flex flex-col items-center gap-6"
              animate={
                phase === "exit"
                  ? isMobile
                    ? { opacity: 0, scale: 0.98, x: 0, y: 0 }
                    : {
                        opacity: [1, 1, 0],
                        x: handoff.x,
                        y: handoff.y,
                        scale: handoff.scale,
                      }
                  : { opacity: 1, x: 0, y: 0, scale: 1 }
              }
              transition={{
                duration: EXIT_DURATION / 1000,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: EXIT_DURATION / 1000, times: [0, 0.7, 1] },
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
                transition={{ duration: 0.2 }}
                className="section-label tabular-nums"
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LoaderContext.Provider>
  );
}
