"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/context/ModeContext";

const DOT_COUNT = 14;
const BASE_SIZE = 10;
const FOLLOW_SPEED = 0.25;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

function prefersCoarsePointer(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia?.("(pointer: coarse)")?.matches ??
    window.matchMedia?.("(hover: none)")?.matches ??
    false
  );
}

export default function CursorTrail() {
  const { mode } = useMode();
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const positions = useRef(
    Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 })),
  );
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (mode !== "react" || prefersReducedMotion() || prefersCoarsePointer()) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    const animate = () => {
      let x = mouse.current.x;
      let y = mouse.current.y;

      positions.current.forEach((pos, index) => {
        pos.x += (x - pos.x) * FOLLOW_SPEED;
        pos.y += (y - pos.y) * FOLLOW_SPEED;

        const dot = dotsRef.current[index];
        if (dot) {
          const scale = 1 - index / DOT_COUNT;
          const sizeOffset = (BASE_SIZE * scale) / 2;
          dot.style.transform = `translate3d(${pos.x - sizeOffset}px, ${pos.y - sizeOffset}px, 0) scale(${scale})`;
          dot.style.opacity = `${0.75 - index * 0.04}`;
        }

        x = pos.x;
        y = pos.y;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [mode]);

  if (mode !== "react" || prefersReducedMotion() || prefersCoarsePointer()) {
    return null;
  }

  return (
    <div className="cursor-trail" aria-hidden="true">
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <span
          key={index}
          className="cursor-trail-dot"
          ref={(el) => {
            if (el) {
              dotsRef.current[index] = el;
            }
          }}
        />
      ))}
    </div>
  );
}
