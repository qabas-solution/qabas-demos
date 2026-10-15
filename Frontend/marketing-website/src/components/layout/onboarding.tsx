import { useState } from "react";
import { BrailleCell, Mascot } from "@/components/brand";
import { Button } from "@/components/ui";
import { useLocale } from "@/hooks/use-locale";
import { useLiteMode } from "@/hooks/use-lite-mode";
import { useTheme } from "@/hooks/use-theme";

const storageKey = "qabas-welcomed";

export function Onboarding() {
  const { t } = useLocale();
  const { isDark, setTheme } = useTheme();
  const { isLiteMode, setLiteMode } = useLiteMode();
  const [isVisible, setIsVisible] = useState(() => window.localStorage.getItem(storageKey) !== "1");
  const finish = () => { window.localStorage.setItem(storageKey, "1"); setIsVisible(false); };

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="w-full max-w-lg rounded-section border border-line bg-surface p-8 text-center shadow-lg">
        <Mascot className="mx-auto h-40 w-40" pose="hero" />
        <BrailleCell className="mx-auto mt-3" size="md" />
        <p className="mt-5 text-sm font-bold text-purple">{t("onboarding.eyebrow")}</p>
        <h2 className="mt-2 text-3xl font-bold" id="onboarding-title">{t("onboarding.title")}</h2>
        <p className="mt-3 text-ink-muted">{t("onboarding.description")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3"><Button variant="secondary" type="button" onClick={() => setTheme(isDark ? "light" : "dark")}>{t("theme")}</Button><Button variant="secondary" type="button" onClick={() => setLiteMode(!isLiteMode)}>{t("liteMode")}</Button><Button type="button" onClick={finish}>{t("onboarding.start")}</Button></div>
        <button className="mt-5 text-sm text-ink-muted underline" type="button" onClick={finish}>{t("onboarding.skip")}</button>
      </div>
    </div>
  );
}
