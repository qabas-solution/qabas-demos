import { Link } from "react-router-dom";
import { BrailleCell, Mascot, Sparkles } from "@/components/brand";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/layout";
import { useLocale } from "@/hooks/use-locale";
import type { ChallengeContent } from "../types";

interface ChallengePageContentProps {
  content: ChallengeContent;
}

export function ChallengePageContent({ content }: ChallengePageContentProps) {
  const { locale, t } = useLocale();
  return <main>
    <section className="relative overflow-hidden"><div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:min-h-[34rem] lg:grid-cols-[1.1fr_.9fr]"><div><p className="flex items-center gap-2 text-sm font-bold text-purple"><BrailleCell size="sm" />{t("challengeContent.eyebrow")}</p><h1 className="mt-5 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl">{t("challengeContent.heroTitle")}</h1><p className="mt-6 max-w-xl text-lg leading-9 text-ink-muted">{t("challengeContent.heroDescription")}</p></div><div className="relative grid min-h-64 place-items-center rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-pink/20"><Mascot className="h-56 w-56" pose="thinking" /><Sparkles className="absolute end-10 top-8 text-amber" /></div></div></section>
    <Section className="pt-0"><div className="grid overflow-hidden rounded-section border border-line bg-surface shadow-sm sm:grid-cols-2 lg:grid-cols-4">{content.stats.map((stat) => <div className="relative border-b border-line p-6 last:border-0 sm:border-e lg:border-b-0" key={stat.value}><BrailleCell className="absolute end-5 top-5 text-amber" size="sm" /><strong className="block text-4xl font-extrabold text-purple">{stat.value}</strong><span className="mt-2 block text-sm leading-6 text-ink-muted">{stat.label[locale]}</span></div>)}</div></Section>
    <Section className="pt-0"><div className="grid items-center gap-10 rounded-section bg-surface-soft p-7 md:grid-cols-2 md:p-12"><div className="relative grid min-h-64 place-items-center"><div className="rounded-card bg-surface p-8 shadow-lg"><BrailleCell size="lg" /><i className="mt-5 block h-2 w-40 rounded bg-line" /><i className="mt-4 block h-2 w-28 rounded bg-line" /><i className="mt-4 block h-2 w-32 rounded bg-line" /></div><Mascot className="absolute bottom-0 start-1/2 h-36 w-36 translate-x-1/2" pose="thinking" /></div><Reveal><p className="text-sm font-bold text-purple">{t("challengeContent.storyEyebrow")}</p><h2 className="mt-3 text-3xl font-bold">{t("challengeContent.storyTitle")}</h2><p className="mt-5 leading-8 text-ink-muted">{t("challengeContent.storyDescription")}</p><blockquote className="mt-6 border-s-4 border-amber ps-5 text-lg font-bold leading-8">{t("challengeContent.storyQuote")}</blockquote></Reveal></div></Section>
    <Section className="pt-0"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{content.barriers.map((barrier) => <Reveal className="rounded-card border border-line bg-surface p-6 shadow-sm" key={barrier.number}><strong className="text-4xl text-ink/15">{barrier.number}</strong><h3 className="mt-8 text-xl font-bold">{barrier.title[locale]}</h3><p className="mt-3 text-sm leading-7 text-ink-muted">{barrier.description[locale]}</p></Reveal>)}</div></Section>
    <Section className="pt-0"><div className="grid items-center gap-8 rounded-section bg-surface-soft p-8 md:grid-cols-[.7fr_1.3fr] md:p-12"><Mascot className="mx-auto h-44 w-44" pose="success" /><div><p className="text-sm font-bold text-purple">{t("homeContent.beginTogether")}</p><h2 className="mt-3 text-4xl font-bold">{t("homeContent.everyDot")}</h2><p className="mt-4 text-ink-muted">{t("homeContent.joinUs")}</p><Link to={`/${locale}/solution`} className="mt-6 inline-flex min-h-12 items-center rounded-control bg-primary px-6 font-bold text-white">{t("homeContent.tryPlatform")}</Link></div></div></Section>
  </main>;
}
