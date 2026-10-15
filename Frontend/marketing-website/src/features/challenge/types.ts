import type { Localized } from "@/types";

export interface ChallengeStat {
  value: string;
  label: Localized<string>;
}

export interface ChallengeBarrier {
  number: string;
  title: Localized<string>;
  description: Localized<string>;
}

export interface ChallengeContent {
  stats: readonly ChallengeStat[];
  barriers: readonly ChallengeBarrier[];
}
