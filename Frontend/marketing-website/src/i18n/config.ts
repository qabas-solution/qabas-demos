import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arCommon from "./resources/ar/common.json";
import enCommon from "./resources/en/common.json";

export const supportedLocales = ["ar", "en"] as const;
export type Locale = (typeof supportedLocales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "ar" || value === "en";
}

void i18n.use(initReactI18next).init({
  resources: {
    ar: { common: arCommon },
    en: { common: enCommon },
  },
  lng: "ar",
  fallbackLng: "ar",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
