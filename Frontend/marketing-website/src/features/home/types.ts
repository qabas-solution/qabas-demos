import type { Localized } from "@/types";

export interface HomeStat {
  label: Localized<string>;
  value: string;
}

export interface HomeTeaser {
  color: "sky" | "pink" | "mint" | "lemon";
  description: Localized<string>;
  path: string;
  title: Localized<string>;
}

export interface HomeContent {
  quote: Localized<string>;
  stats: readonly HomeStat[];
  teasers: readonly HomeTeaser[];
  steps: readonly Localized<string>[];
}
