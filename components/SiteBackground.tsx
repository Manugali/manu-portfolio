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
        raysColor="#ffffff"
        raysSpeed={subtle ? 0.5 : 0.9}
        lightSpread={subtle ? 0.4 : 0.65}
        rayLength={subtle ? 0.8 : 1}
        followMouse={!subtle && !isMobile}
        mouseInfluence={0.06}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
      />
    </div>
  );
}
