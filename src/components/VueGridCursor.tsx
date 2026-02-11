"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/context/ModeContext";

const GRID = 40;

export default function VueGridCursor() {
  const { mode } = useMode();
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (mode !== "vue") return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const x = Math.round(e.clientX / GRID) * GRID;
      const y = Math.round(e.clientY / GRID) * GRID;
      target.current = { x, y };
    };

    const tick = () => {
      // Very crisp, almost linear follow
      current.current.x += (target.current.x - current.current.x) * 0.35;
      current.current.y += (target.current.y - current.current.y) * 0.35;

      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [mode]);

  if (mode !== "vue") return null;

  return <div ref={ref} className="vue-grid-cursor" aria-hidden="true" />;
}
