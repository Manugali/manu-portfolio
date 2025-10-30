export function NoiseOverlay() {
  // Subtle animated noise using a tiny SVG data URL layered on top
  const noise =
    "data:image/svg+xml;utf8,\"<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.04'/></svg>\"";
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage: `url(${noise})`,
        animation: "noiseMove 8s linear infinite",
        maskImage: "radial-gradient(60% 60% at 50% 50%, black, transparent)",
      }}
    />
  );
}


