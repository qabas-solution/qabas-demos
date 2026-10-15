import { useContext } from "react";
import { LiteModeContext } from "@/app/providers/lite-mode-provider";

export function useLiteMode() {
  const context = useContext(LiteModeContext);
  if (!context) {
    throw new Error("useLiteMode must be used inside LiteModeProvider");
  }
  return context;
}
