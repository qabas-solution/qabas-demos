import type { HomeContent } from "../types";

const content: HomeContent = {
  stats: [
    { value: "12K+", label: { ar: "كلمة مترجمة", en: "words translated" } },
    { value: "480+", label: { ar: "مستفيداً", en: "people reached" } },
    { value: "38", label: { ar: "مدرسة شريكة", en: "partner schools" } },
    { value: "96%", label: { ar: "دقّة أولية", en: "early accuracy" } },
  ],
  steps: [
    { ar: "امسح أو اكتب برايل", en: "Scan or type Braille" },
    { ar: "نترجم النقاط", en: "We translate the dots" },
    { ar: "اقرأ العربية", en: "Read clear Arabic" },
  ],
  teasers: [
    {
      path: "about",
      color: "sky",
      title: { ar: "من نحن", en: "About QABAS" },
      description: {
        ar: "فريق صغير يحمل حلماً كبيراً: أن تكون المعرفة العربية في متناول الجميع.",
        en: "A small team with one big belief: Arabic knowledge should be within everyone’s reach.",
      },
    },
    {
      path: "challenge",
      color: "pink",
      title: { ar: "التحدّي", en: "The challenge" },
      description: {
        ar: "الأدوات العربية لبرايل قليلة، بطيئة، وغالباً بعيدة عن العائلة والمعلم.",
        en: "Arabic Braille tools are scarce, slow, and often out of reach for families and teachers.",
      },
    },
    {
      path: "solution",
      color: "mint",
      title: { ar: "الحل", en: "The solution" },
      description: {
        ar: "من نقاط برايل إلى نص عربي واضح في لحظات، عبر تجربة بسيطة وآمنة.",
        en: "From Braille dots to clear Arabic in moments, through a simple and safe experience.",
      },
    },
    {
      path: "impact",
      color: "lemon",
      title: { ar: "الأثر", en: "Our impact" },
      description: {
        ar: "نقيس ما نصنعه بالكلمات المقروءة والفرص التي أصبحت أقرب.",
        en: "We measure what we build in words read and opportunities brought closer.",
      },
    },
  ],
  quote: {
    ar: "حين يستطيع طفلي أن يقرأ بنفسه، لا تكون الترجمة مجرد تقنية… بل نافذة جديدة.",
    en: "When my child can read independently, translation is no longer just technology—it is a new window.",
  },
};

export function getHomeContent(): HomeContent {
  return content;
}
