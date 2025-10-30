"use client";

import * as React from "react";

type Particle = { x: number; y: number; z: number; vx: number; vy: number; vz: number };

export function ParticleField() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = canvas.clientWidth * devicePixelRatio);
    let height = (canvas.height = canvas.clientHeight * devicePixelRatio);

    const rand = (n: number) => Math.random() * n - n / 2;
    const particles: Particle[] = Array.from({ length: 140 }, () => ({
      x: rand(width),
      y: rand(height),
      z: Math.random() * 800 + 200,
      vx: rand(0.2),
      vy: rand(0.2),
      vz: -Math.random() * 0.6 - 0.2,
    }));

    let mouseX = 0, mouseY = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) * devicePixelRatio;
      mouseY = (e.clientY - rect.top - rect.height / 2) * devicePixelRatio;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      width = canvas.width = canvas.clientWidth * devicePixelRatio;
      height = canvas.height = canvas.clientHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (const p of particles) {
        p.x += p.vx + (mouseX / width) * 0.6;
        p.y += p.vy + (mouseY / height) * 0.6;
        p.z += p.vz;
        if (p.z < 100) {
          p.z = 1000;
          p.x = Math.random() * width - width / 2;
          p.y = Math.random() * height - height / 2;
        }
        const scale = 200 / p.z;
        const px = p.x * scale;
        const py = p.y * scale;
        const alpha = Math.min(1, Math.max(0.1, 1 - p.z / 1000));

        ctx.beginPath();
        ctx.fillStyle = `rgba(56,189,248,${alpha})`; // sky-400
        ctx.arc(px, py, Math.max(0.8, 2 * scale), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-0">
      <canvas ref={ref} className="h-full w-full" style={{ filter: "blur(0.2px)" }} />
      {!mounted && <div className="h-full w-full" />}
    </div>
  );
}


