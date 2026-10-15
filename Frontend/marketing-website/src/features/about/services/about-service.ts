import type { AboutContent } from "../types";

const content: AboutContent = {
  mission: {
    eyebrow: { ar: "مهمتنا", en: "Our mission" },
    title: { ar: "إزالة الحواجز، نقطةً نقطة", en: "Remove barriers, dot by dot" },
    description: { ar: "نبني أدوات عربية سهلة وموثوقة تمنح مستخدمي برايل استقلالية أكبر في التعلّم والتواصل.", en: "We build simple, trusted Arabic tools that give Braille readers more independence in learning and communication." },
  },
  vision: {
    eyebrow: { ar: "رؤيتنا", en: "Our vision" },
    title: { ar: "عربية متاحة بلا استثناء", en: "Accessible Arabic, without exception" },
    description: { ar: "عالمٌ لا تحدد فيه طريقة القراءة فرص المعرفة أو المشاركة.", en: "A world where the way someone reads never limits their access to knowledge or participation." },
  },
  timeline: [
    { year: "2022", title: { ar: "سؤال في قاعة الدراسة", en: "A question in the classroom" }, description: { ar: "تعلّمنا، اختبرنا، واستمعنا للمجتمع في كل خطوة.", en: "At every step we learned, tested, and listened to the community." } },
    { year: "2023", title: { ar: "أول نموذج للترجمة", en: "Our first translation model" }, description: { ar: "تعلّمنا، اختبرنا، واستمعنا للمجتمع في كل خطوة.", en: "At every step we learned, tested, and listened to the community." } },
    { year: "2024", title: { ar: "التجربة مع المدارس", en: "Piloting with schools" }, description: { ar: "تعلّمنا، اختبرنا، واستمعنا للمجتمع في كل خطوة.", en: "At every step we learned, tested, and listened to the community." } },
    { year: "2025", title: { ar: "قبس يصل إلى المزيد", en: "QABAS reaches further" }, description: { ar: "تعلّمنا، اختبرنا، واستمعنا للمجتمع في كل خطوة.", en: "At every step we learned, tested, and listened to the community." } },
  ],
  values: [
    { color: "sky", title: { ar: "قريبون", en: "Human first" }, description: { ar: "نبدأ دائماً بالاستماع.", en: "We listen, include, and build with care." } },
    { color: "pink", title: { ar: "شجعان", en: "Bravely curious" }, description: { ar: "نسأل ونتعلّم باستمرار.", en: "We listen, include, and build with care." } },
    { color: "mint", title: { ar: "متاحون", en: "Accessible always" }, description: { ar: "الوصول جزء من البداية.", en: "We listen, include, and build with care." } },
    { color: "lemon", title: { ar: "متعاونون", en: "Better together" }, description: { ar: "نبني مع المجتمع، لا عنه.", en: "We listen, include, and build with care." } },
  ],
};

export function getAboutContent(): AboutContent {
  return content;
}
