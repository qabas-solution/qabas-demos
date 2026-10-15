import { Link } from "react-router-dom";
import { BrailleCell, Mascot, Sparkles } from "@/components/brand";
import { Button } from "@/components/ui";
import { useLocale } from "@/hooks/use-locale";

export function HomeHero() {
  const { locale, t } = useLocale();
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:min-h-[42rem] lg:grid-cols-[1.05fr_.95fr] lg:py-24">
        <div className="relative z-10">
          <p className="flex items-center gap-2 text-sm font-bold text-purple"><BrailleCell size="sm" />{t("homeContent.eyebrow")}</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">{t("homeContent.title")}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-ink-muted">{t("homeContent.description")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/${locale}/solution`}><Button>{t("homeContent.tryPlatform")} <span aria-hidden="true">→</span></Button></Link>
            <Link to={`/${locale}/team`}><Button variant="secondary">{t("homeContent.meetTeam")} <span aria-hidden="true">♧</span></Button></Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-6 text-sm font-semibold text-ink-muted"><span className="text-success">✓ WCAG AA</span><span>♡ {t("home.madeWithCare")}</span></div>
        </div>
        <div className="relative grid min-h-[25rem] place-items-center" aria-label={t("homeContent.demoLabel")}>
          <Sparkles className="absolute end-0 top-8 size-8 text-amber" />
          <Sparkles className="absolute bottom-12 end-8 size-5 text-pink" />
          <div className="relative grid w-full max-w-md place-items-center rounded-[42%_58%_54%_46%/48%_42%_58%_52%] bg-purple/10 p-8 shadow-lg">
            <Mascot className="absolute -bottom-4 start-0 z-10 h-44 w-44 -rotate-6" pose="hero" />
            <div className="w-full max-w-sm -rotate-2 rounded-section border border-line bg-surface p-7 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted"><i className="size-2 rounded-full bg-success" />{t("homeContent.liveTranslation")}</div>
              <div className="flex min-h-48 items-center justify-around gap-5" dir="ltr">
                <BrailleCell size="lg" activeDots={[1, 2, 5]} />
                <span className="text-3xl text-amber">→</span>
                <strong className="text-8xl text-purple">ق</strong>
              </div>
              <div className="h-1 overflow-hidden rounded-control bg-surface-soft"><i className="block h-full w-2/3 rounded-control bg-gradient-to-r from-purple to-amber" /></div>
              <small className="mt-3 block text-center text-xs text-ink-muted">{t("homeContent.listenCopyShare")}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
