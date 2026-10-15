import type { Localized } from "@/types";

export interface SolutionFeature {
  kind: "input" | "translate" | "share";
  title: Localized<string>;
  description: Localized<string>;
}

export interface SolutionComparison {
  label: Localized<string>;
  qabas: boolean;
  traditional: boolean;
}

export interface SolutionContent {
  features: readonly SolutionFeature[];
  comparison: readonly SolutionComparison[];
}
