"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/context/ModeContext";

export default function NoirSpotlight() {
  const { mode } = useMode();
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (mode !== "noir") return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;

      el.style.setProperty("--spot-x", `${current.current.x}px`);
      el.style.setProperty("--spot-y", `${current.current.y}px`);

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [mode]);

  if (mode !== "noir") return null;

  return <div ref={ref} className="noir-spotlight" aria-hidden="true" />;
}
