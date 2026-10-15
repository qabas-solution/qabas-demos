import { Link } from "react-router-dom";
import { BrailleCell, Mascot, Sparkles } from "@/components/brand";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/layout";
import { useLocale } from "@/hooks/use-locale";
import type { HomeContent } from "../types";

interface HomeSectionsProps {
  content: HomeContent;
}

export function HomeSections({ content }: HomeSectionsProps) {
  const { locale, t } = useLocale();
  return (
    <>
      <Section className="pt-0">
        <div className="grid overflow-hidden rounded-section border border-line bg-surface shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat) => <div className="relative border-b border-line p-6 last:border-0 sm:border-e lg:border-b-0" key={stat.value}><BrailleCell className="absolute end-5 top-5 text-amber" size="sm" /><strong className="block text-4xl font-extrabold text-purple">{stat.value}</strong><span className="mt-2 block text-sm text-ink-muted">{stat.label[locale]}</span></div>)}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-5 rounded-section bg-surface-soft p-6 md:grid-cols-[1.15fr_repeat(3,1fr)] md:p-8">
          <div><p className="text-sm font-bold text-purple">{t("homeContent.threeSteps")}</p><h2 className="mt-2 text-3xl font-bold">{t("homeContent.howItWorks")}</h2></div>
          {content.steps.map((step, index) => <article className="rounded-card border border-line bg-surface p-5" key={step.en}><span className="text-xs font-bold text-ink-muted">0{index + 1}</span><div className="mt-5 text-purple">{index === 0 ? "⌗" : index === 1 ? <BrailleCell size="md" /> : <strong className="text-4xl">ع</strong>}</div><b className="mt-5 block text-sm">{step[locale]}</b></article>)}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="space-y-20">
          {content.teasers.map((teaser, index) => <Reveal className="grid items-center gap-10 md:grid-cols-2 md:gap-20" key={teaser.path}><div className={`relative grid min-h-72 place-items-center overflow-hidden rounded-section ${["bg-sky/25", "bg-pink/25", "bg-mint/25", "bg-lemon/25"][index]} ${index % 2 ? "md:order-2" : ""}`}><span className="absolute start-5 top-2 text-8xl font-black text-ink/10">0{index + 1}</span>{index === 0 && <Mascot className="h-56 w-56" pose="hero" />}{index === 1 && <div className="rounded-card bg-surface p-8 shadow-lg"><BrailleCell size="lg" /><i className="mt-5 block h-2 w-40 rounded bg-line" /><i className="mt-4 block h-2 w-28 rounded bg-line" /></div>}{index === 2 && <div className="flex items-center gap-5 rounded-card bg-surface p-8 text-purple shadow-lg"><BrailleCell size="lg" /><span className="text-3xl text-amber">→</span><strong className="text-4xl">نور</strong></div>}{index === 3 && <div className="flex h-44 items-end gap-3">{[45, 68, 55, 90, 78].map((height) => <i className="w-8 rounded-t-lg bg-gradient-to-t from-purple to-sky" key={height} style={{ height: `${height}%` }} />)}</div>}</div><div className={index % 2 ? "md:order-1" : ""}><p className="text-sm font-bold text-purple">{teaser.title[locale]}</p><h2 className="mt-3 text-4xl font-bold">{teaser.title[locale]}</h2><p className="mt-5 leading-8 text-ink-muted">{teaser.description[locale]}</p><Link className="mt-5 inline-flex font-bold text-purple" to={`/${locale}/${teaser.path}`}>{t("homeContent.learnMore")} <span className="ms-2" aria-hidden="true">→</span></Link></div></Reveal>)}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="mx-auto max-w-4xl rounded-section border border-line bg-surface p-8 text-center shadow-sm md:p-14"><Sparkles className="mx-auto text-amber" /><blockquote className="mx-auto mt-5 max-w-3xl text-2xl font-bold leading-relaxed">{content.quote[locale]}</blockquote><div className="mt-7 flex items-center justify-center gap-3 text-start"><span className="grid size-11 place-items-center rounded-full bg-surface-soft font-bold text-purple">أ</span><span><b className="block text-sm">{t("homeContent.quoteAuthor")}</b><small className="text-ink-muted">{t("homeContent.quoteProgram")}</small></span></div></div>
      </Section>
      <Section className="pt-0">
        <div className="grid items-center gap-8 rounded-section bg-surface-soft p-8 md:grid-cols-[.7fr_1.3fr] md:p-12"><Mascot className="mx-auto h-48 w-48" pose="hero" /><div><p className="text-sm font-bold text-purple">{t("homeContent.beginTogether")}</p><h2 className="mt-3 text-4xl font-bold">{t("homeContent.everyDot")}</h2><p className="mt-4 text-ink-muted">{t("homeContent.joinUs")}</p><div className="mt-6 flex flex-wrap gap-3"><Link to={`/${locale}/solution`} className="inline-flex min-h-12 items-center rounded-control bg-primary px-6 font-bold text-white">{t("homeContent.tryPlatform")}</Link><Link to={`/${locale}/contact`} className="inline-flex min-h-12 items-center rounded-control border border-line bg-surface px-6 font-bold">{t("homeContent.talkToUs")}</Link></div></div></div>
      </Section>
    </>
  );
}
