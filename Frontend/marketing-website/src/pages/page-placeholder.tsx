import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { useLiteMode } from "@/hooks/use-lite-mode";
import { useTheme } from "@/hooks/use-theme";

export type PageKey =
  | "home"
  | "about"
  | "challenge"
  | "solution"
  | "impact"
  | "awards"
  | "team"
  | "contact";

interface PagePlaceholderProps {
  page: PageKey;
}

export function PagePlaceholder({ page }: PagePlaceholderProps) {
  const { locale, t } = useLocale();
  const { isDark, setTheme } = useTheme();
  const { isLiteMode, setLiteMode } = useLiteMode();
  const alternateLocale = locale === "ar" ? "en" : "ar";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-bg p-6 text-center text-ink">
      <div>
        <p className="text-sm font-semibold text-purple">{t("tagline")}</p>
        <h1 className="mt-3 text-4xl font-bold">{t("brand")}</h1>
        <p className="mt-4 text-ink-muted">{page}: {t("pageComingSoon")}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link className="rounded-control border border-line px-4 py-3" to={`/${alternateLocale}`}>
          {t("language")}
        </Link>
        <button
          className="rounded-control border border-line px-4 py-3"
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {t("theme")}
        </button>
        <button
          className="rounded-control border border-line px-4 py-3"
          type="button"
          onClick={() => setLiteMode(!isLiteMode)}
        >
          {t("liteMode")}
        </button>
      </div>
    </main>
  );
}
