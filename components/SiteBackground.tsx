"use client";

import { useEffect, useState } from "react";
import LightRays from "@/components/LightRays";

type SiteBackgroundProps = {
  subtle?: boolean;
};

export function SiteBackground({ subtle = false }: SiteBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <LightRays
        raysOrigin="top-center"
        raysColor="#a8b4c4"
        raysSpeed={subtle ? 0.6 : 1.1}
        lightSpread={subtle ? 0.45 : 0.7}
        rayLength={subtle ? 0.85 : 1.1}
        followMouse={!subtle && !isMobile}
        mouseInfluence={subtle ? 0.04 : 0.08}
        noiseAmount={0.02}
        distortion={0.02}
        className="custom-rays"
      />
    </div>
  );
}
