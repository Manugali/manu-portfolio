"use client";

import LightRays from "@/components/LightRays";

type SiteBackgroundProps = {
  subtle?: boolean;
};

export function SiteBackground({ subtle = false }: SiteBackgroundProps) {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={subtle ? 0.8 : 1.5}
        lightSpread={subtle ? 0.5 : 0.8}
        rayLength={subtle ? 0.9 : 1.2}
        followMouse={!subtle}
        mouseInfluence={subtle ? 0.05 : 0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
      />
    </div>
  );
}
