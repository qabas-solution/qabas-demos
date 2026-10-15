import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { isLocale, type Locale } from "@/i18n/config";

export function useLocale() {
  const { lang } = useParams<{ lang: string }>();
  const locale: Locale = isLocale(lang) ? lang : "ar";
  const translation = useTranslation("common");
  return { locale, ...translation };
}
