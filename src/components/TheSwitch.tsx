"use client";

import { useMode, AppMode } from "@/context/ModeContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TheSwitch() {
  const { mode, setMode } = useMode();

  const modes: { id: AppMode; label: string }[] = [
    { id: "noir", label: "NOIR" },
    { id: "react", label: "REACT" },
    { id: "vue", label: "VUE" },
  ];

  return (
    <div className="relative sm:fixed sm:top-6 sm:right-6 z-50 mx-auto sm:mx-0 mt-1 sm:mt-0 flex w-full sm:w-fit items-center justify-between gap-0 sm:gap-2 p-1 border border-white/10 bg-black/50 backdrop-blur-md rounded-lg max-w-[calc(100vw-1.5rem)]">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={cn(
            "relative flex-1 sm:flex-none px-3 sm:px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.25em] sm:tracking-widest transition-colors duration-300",
            mode === m.id ? "text-black" : "text-white/50 hover:text-white",
          )}
        >
          {mode === m.id && (
            <motion.div
              layoutId="active-switch"
              className="absolute inset-0 rounded"
              style={{
                backgroundColor:
                  m.id === "noir"
                    ? "rgba(255,255,255,0.95)"
                    : "var(--glow-color)",
                boxShadow:
                  m.id === "noir"
                    ? "0 0 18px rgba(255,255,255,0.18)"
                    : "0 0 22px color-mix(in srgb, var(--glow-color) 45%, transparent)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}

          <span className="relative z-10">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
