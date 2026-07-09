export function AtmosphereOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2]" aria-hidden>
      <div className="atmosphere-grid absolute inset-0" />
      <div className="atmosphere-grain absolute inset-0" />
      <div className="atmosphere-vignette absolute inset-0" />
    </div>
  );
}
