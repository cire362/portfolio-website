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
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 p-1 border border-white/10 bg-black/50 backdrop-blur-md rounded-lg">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={cn(
            "relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
            mode === m.id ? "text-black" : "text-white/50 hover:text-white",
          )}
        >
          {mode === m.id && (
            <motion.div
              layoutId="active-switch"
              className={cn(
                "absolute inset-0 rounded shadow-md",
                mode === "noir" && "bg-white shadow-white/20",
                mode === "react" && "bg-neon-react shadow-neon-react/50",
                mode === "vue" && "bg-neon-vue shadow-neon-vue/50",
              )}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}

          <span className="relative z-10">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
