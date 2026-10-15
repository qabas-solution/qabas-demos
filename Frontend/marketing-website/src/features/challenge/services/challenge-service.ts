import type { ChallengeContent } from "../types";

const content: ChallengeContent = {
  stats: [
    { value: "1–2%", label: { ar: "من الكتب العربية متاحة ببرايل", en: "of Arabic books available in Braille" } },
    { value: "6×", label: { ar: "وقت أطول للتحويل اليدوي", en: "longer for manual transcription" } },
    { value: "70%", label: { ar: "من المعلمين يحتاجون أدوات أسهل", en: "of teachers need simpler tools" } },
    { value: "∞", label: { ar: "إمكانات تنتظر الوصول", en: "possibilities waiting" } },
  ],
  barriers: [
    { number: "01", title: { ar: "أدوات قليلة", en: "Too few tools" }, description: { ar: "حاجز صغير في الأداة قد يصنع فجوة كبيرة في التجربة.", en: "A small tool barrier can create a wide gap in someone’s experience." } },
    { number: "02", title: { ar: "تكلفة مرتفعة", en: "High cost" }, description: { ar: "حاجز صغير في الأداة قد يصنع فجوة كبيرة في التجربة.", en: "A small tool barrier can create a wide gap in someone’s experience." } },
    { number: "03", title: { ar: "وقت طويل", en: "Slow processes" }, description: { ar: "حاجز صغير في الأداة قد يصنع فجوة كبيرة في التجربة.", en: "A small tool barrier can create a wide gap in someone’s experience." } },
    { number: "04", title: { ar: "دعم عربي محدود", en: "Limited Arabic support" }, description: { ar: "حاجز صغير في الأداة قد يصنع فجوة كبيرة في التجربة.", en: "A small tool barrier can create a wide gap in someone’s experience." } },
  ],
};

export function getChallengeContent(): ChallengeContent {
  return content;
}
