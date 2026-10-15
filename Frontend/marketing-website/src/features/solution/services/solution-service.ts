import type { SolutionContent } from "../types";

const content: SolutionContent = {
  features: [
    { kind: "input", title: { ar: "أدخل بطريقتك", en: "Input your way" }, description: { ar: "امسح صورة، اكتب النمط، أو استخدم لوحة برايل التفاعلية.", en: "Scan an image, type a pattern, or use our interactive Braille cell." } },
    { kind: "translate", title: { ar: "افهم في لحظات", en: "Understand in moments" }, description: { ar: "تحويل سريع إلى العربية مع قراءة صوتية ودرجة ثقة واضحة.", en: "Fast Arabic output with read-aloud support and a clear confidence score." } },
    { kind: "share", title: { ar: "شارك بأمان", en: "Share with confidence" }, description: { ar: "انسخ واحفظ وشارك المحتوى مع حماية الخصوصية في كل خطوة.", en: "Copy, save, and share content with privacy built into every step." } },
  ],
  comparison: [
    { label: { ar: "ترجمة فورية", en: "Instant translation" }, qabas: true, traditional: false },
    { label: { ar: "دعم العربية أولاً", en: "Arabic-first" }, qabas: true, traditional: false },
    { label: { ar: "متاح من أي جهاز", en: "Works on any device" }, qabas: true, traditional: true },
    { label: { ar: "قراءة صوتية", en: "Text to speech" }, qabas: true, traditional: false },
    { label: { ar: "تكلفة منخفضة", en: "Low cost" }, qabas: true, traditional: false },
  ],
};

export function getSolutionContent(): SolutionContent {
  return content;
}
