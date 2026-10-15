import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface LiteModeContextValue {
  isLiteMode: boolean;
  setLiteMode: (enabled: boolean) => void;
}

export const LiteModeContext = createContext<LiteModeContextValue | null>(null);

const storageKey = "qabas-lite";

export function LiteModeProvider({ children }: { children: ReactNode }) {
  const [isLiteMode, setLiteModeState] = useState(
    () => window.localStorage.getItem(storageKey) === "1",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("lite-mode", isLiteMode);
    window.localStorage.setItem(storageKey, isLiteMode ? "1" : "0");
  }, [isLiteMode]);

  const value = useMemo(
    () => ({
      isLiteMode,
      setLiteMode: (enabled: boolean) => setLiteModeState(enabled),
    }),
    [isLiteMode],
  );

  return <LiteModeContext.Provider value={value}>{children}</LiteModeContext.Provider>;
}
