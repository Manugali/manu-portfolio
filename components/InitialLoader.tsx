"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import LightRays from "@/components/LightRays";

const LOADER_KEY = "manu-portfolio-loader-seen";
const ANIMATION_DURATION = 2800;

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
    const wavePoints = [];

    for (let x = 0; x <= 100; x += 2) {
      const wave1 = Math.sin(wavePhase * 0.15 + x * 0.15) * 10;
      const wave2 = Math.sin(wavePhase * 0.1 + x * 0.12) * 4;
      const wave3 = Math.sin(wavePhase * 0.06 + x * 0.08) * 2;
      const waveOffset = wave1 + wave2 + wave3;
      const y = Math.max(0, baseY + waveOffset);
      wavePoints.push(`${x}% ${y}%`);
    }

    wavePoints.push("100% 100%");
    wavePoints.push("0% 100%");

    return `polygon(${wavePoints.join(", ")})`;
  }, [progress, wavePhase]);

  return <div style={{ clipPath }}>{children}</div>;
}

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem(LOADER_KEY);
  });
  const [progress, setProgress] = useState(0);
  const [wavePhase, setWavePhase] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<
    "loading" | "zoomIn" | "zoomOut"
  >("loading");
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [targetScale, setTargetScale] = useState(0.12);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  useEffect(() => {
    if (!isLoading) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    const calculateTargetPosition = () => {
      const isMobileDevice = window.innerWidth < 768;
      let scaleRatio;

      if (isMobileDevice) {
        scaleRatio = 24 / 96;
        const logoY = 12 + 46;
        setTargetPosition({
          x: -window.innerWidth / 2 + 12,
          y: -window.innerHeight / 2 + logoY,
        });
      } else {
        const isLargeScreen = window.innerWidth >= 1024;
        scaleRatio = isLargeScreen ? 36 / 256 : 30 / 192;
        const logoCenterX = window.innerWidth * 0.06;
        const logoY = 24 + 46;
        setTargetPosition({
          x: -window.innerWidth / 2 + logoCenterX,
          y: -window.innerHeight / 2 + logoY,
        });
      }

      setTargetScale(scaleRatio);
    };

    calculateTargetPosition();
    window.addEventListener("resize", calculateTargetPosition);
    return () => window.removeEventListener("resize", calculateTargetPosition);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;

    const loadingMessages = [
      { threshold: 0, message: "Initializing..." },
      { threshold: 25, message: "Loading experience..." },
      { threshold: 50, message: "Preparing interface..." },
      { threshold: 75, message: "Almost ready..." },
    ];

    const startTime = Date.now();
    let animationFrame: number;
    let animationComplete = false;
    const messageInterval = ANIMATION_DURATION / loadingMessages.length;
    let currentMessageIndex = 0;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / ANIMATION_DURATION, 1);

      if (t < 1) {
        const expectedIndex = Math.floor(elapsed / messageInterval);
        if (
          expectedIndex < loadingMessages.length &&
          expectedIndex !== currentMessageIndex
        ) {
          currentMessageIndex = expectedIndex;
          setLoadingMessage(loadingMessages[currentMessageIndex].message);
        }

        setWavePhase(elapsed * 0.004);

        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        setProgress(eased * 100);
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        animationComplete = true;
        setAnimationPhase("zoomIn");

        setTimeout(() => {
          setAnimationPhase("zoomOut");
          sessionStorage.setItem(LOADER_KEY, "1");

          setTimeout(() => {
            setIsLoading(false);
          }, 700);
        }, 450);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    const maxTimeout = setTimeout(() => {
      if (!animationComplete) {
        cancelAnimationFrame(animationFrame);
        setProgress(100);
        sessionStorage.setItem(LOADER_KEY, "1");
        setAnimationPhase("zoomIn");
        setTimeout(() => {
          setAnimationPhase("zoomOut");
          setTimeout(() => setIsLoading(false), 700);
        }, 450);
      }
    }, ANIMATION_DURATION + 400);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(maxTimeout);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 25%, #111111 50%, #0F0F0F 75%, #0A0A0A 100%)",
            backgroundAttachment: "fixed",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{ zIndex: 1 }}
          >
            <LightRays
              raysOrigin="top-center"
              raysColor="#a8b4c4"
              raysSpeed={1.2}
              lightSpread={0.75}
              rayLength={1.1}
              followMouse
              mouseInfluence={0.08}
              noiseAmount={0.05}
              distortion={0.03}
              className="custom-rays"
            />
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            animate={{
              scale:
                animationPhase === "zoomIn"
                  ? 1.25
                  : animationPhase === "zoomOut"
                    ? isMobile
                      ? 0
                      : targetScale
                    : 1,
              x: animationPhase === "zoomOut" && !isMobile ? targetPosition.x : 0,
              y: animationPhase === "zoomOut" && !isMobile ? targetPosition.y : 0,
              opacity: animationPhase === "zoomOut" && isMobile ? 0 : 1,
            }}
            transition={{
              duration:
                animationPhase === "zoomIn"
                  ? 0.45
                  : animationPhase === "zoomOut"
                    ? isMobile
                      ? 0.5
                      : 0.7
                    : 0,
              ease:
                animationPhase === "zoomIn"
                  ? [0.34, 1.56, 0.64, 1]
                  : [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "center center" }}
          >
            <div className="relative">
              <div className="logo-text relative text-5xl text-gray-500 sm:text-6xl md:text-7xl">
                manu
              </div>
              <div className="logo-text absolute inset-0 overflow-hidden text-5xl text-white sm:text-6xl md:text-7xl">
                <WaveClipPath progress={progress} wavePhase={wavePhase}>
                  manu
                </WaveClipPath>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{
                  opacity: animationPhase === "zoomOut" ? 0 : 1,
                  scale: animationPhase === "zoomOut" ? 0.9 : 1,
                }}
                transition={{ duration: 0.35 }}
                className="text-2xl tabular-nums text-white md:text-3xl"
              >
                {Math.round(progress)}%
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMessage}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: animationPhase === "zoomOut" ? 0 : 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="section-label text-[0.75rem]"
                >
                  {loadingMessage}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
