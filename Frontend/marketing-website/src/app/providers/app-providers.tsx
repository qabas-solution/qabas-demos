import type { ReactNode } from "react";
import { LiteModeProvider } from "./lite-mode-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LiteModeProvider>{children}</LiteModeProvider>
    </ThemeProvider>
  );
}
