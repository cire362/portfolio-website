"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";

export type AppMode = "noir" | "react" | "vue";

const SWITCH_FX_MS = 720;

interface ModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  switchFx: AppMode | null;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<AppMode>("noir");
  const [switchFx, setSwitchFx] = useState<AppMode | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const setMode = (next: AppMode) => {
    setModeState(next);
    setSwitchFx(next);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setSwitchFx(null);
      timeoutRef.current = null;
    }, SWITCH_FX_MS);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = useMemo(() => ({ mode, setMode, switchFx }), [mode, switchFx]);

  return (
    <ModeContext.Provider value={value}>
      <div
        data-mode={mode}
        data-switch={switchFx ?? undefined}
        className="min-h-screen transition-colors duration-500 ease-in-out bg-void text-primary selection:bg-accent selection:text-white"
      >
        <div className="mode-switch-flash" aria-hidden="true" />
        {children}
      </div>
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used within a ModeProvider");
  return context;
};
