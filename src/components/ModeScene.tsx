"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useMode } from "@/context/ModeContext";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

export default function ModeScene() {
  const { mode } = useMode();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const enabled =
    (mode === "react" || mode === "vue") && !prefersReducedMotion();

  const palette = useMemo(() => {
    if (mode === "react") {
      return {
        color: 0x61dafb,
        bgOpacity: 0.0,
      };
    }
    return {
      color: 0x42b883,
      bgOpacity: 0.0,
    };
  }, [mode]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    scene.add(group);

    const material = new THREE.MeshBasicMaterial({
      color: palette.color,
      wireframe: true,
      transparent: true,
      opacity: mode === "react" ? 0.55 : 0.4,
    });

    let mesh: THREE.Object3D;

    if (mode === "react") {
      const geo = new THREE.TorusKnotGeometry(1.25, 0.35, 140, 18);
      mesh = new THREE.Mesh(geo, material);
    } else {
      const box = new THREE.BoxGeometry(2.2, 2.2, 2.2, 5, 5, 5);
      mesh = new THREE.Mesh(box, material);
      const grid = new THREE.GridHelper(10, 20, palette.color, palette.color);
      grid.position.set(0, -2.2, 0);
      (grid.material as THREE.Material).transparent = true;
      (grid.material as THREE.Material).opacity = 0.18;
      group.add(grid);
    }

    group.add(mesh);

    const resize = () => {
      const width = window.innerWidth;
      const height = Math.min(window.innerHeight * 0.8, 900);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();

      if (mode === "react") {
        group.rotation.x = t * 0.25;
        group.rotation.y = t * 0.35;
        group.position.y = Math.sin(t * 0.7) * 0.15;
      } else {
        // Vue: more linear/ordered motion
        group.rotation.x = t * 0.12;
        group.rotation.y = t * 0.18;
        group.position.y = 0;
      }

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);

      renderer.dispose();

      scene.traverse((obj) => {
        const anyObj = obj as any;
        if (anyObj.geometry) anyObj.geometry.dispose?.();
        if (anyObj.material) {
          if (Array.isArray(anyObj.material)) {
            anyObj.material.forEach((m: any) => m.dispose?.());
          } else {
            anyObj.material.dispose?.();
          }
        }
      });
    };
  }, [enabled, mode, palette.color, palette.bgOpacity]);

  if (!enabled) return null;

  return (
    <div className="mode-scene" aria-hidden="true">
      <canvas ref={canvasRef} className="mode-scene-canvas" />
    </div>
  );
}
