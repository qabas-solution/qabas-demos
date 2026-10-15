import { useNavigate, useLocation } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";

export function LanguageSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, t } = useLocale();
  const nextLocale = locale === "ar" ? "en" : "ar";
  const nextPath = location.pathname.replace(/^\/(ar|en)/, `/${nextLocale}`);

  return (
    <button
      aria-label={t("switchLanguage")}
      className="min-h-11 rounded-control border border-line bg-surface px-4 text-sm font-semibold hover:bg-surface-soft"
      type="button"
      onClick={() => navigate(nextPath)}
    >
      {t("language")}
    </button>
  );
}
