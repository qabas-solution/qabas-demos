import { useLocale } from "@/hooks/use-locale";

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
  const { t } = useLocale();

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-8 bg-bg p-6 text-center text-ink">
      <div>
        <p className="text-sm font-semibold text-purple">{t("tagline")}</p>
        <h1 className="mt-3 text-4xl font-bold">{t("brand")}</h1>
        <p className="mt-4 text-ink-muted">{page}: {t("pageComingSoon")}</p>
      </div>
    </main>
  );
}
