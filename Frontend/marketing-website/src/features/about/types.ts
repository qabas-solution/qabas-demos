import type { Localized } from "@/types";

export interface AboutTimelineItem {
  year: string;
  title: Localized<string>;
  description: Localized<string>;
}

export interface AboutValue {
  color: "sky" | "pink" | "mint" | "lemon";
  title: Localized<string>;
  description: Localized<string>;
}

export interface AboutContent {
  mission: { eyebrow: Localized<string>; title: Localized<string>; description: Localized<string> };
  vision: { eyebrow: Localized<string>; title: Localized<string>; description: Localized<string> };
  timeline: readonly AboutTimelineItem[];
  values: readonly AboutValue[];
}
