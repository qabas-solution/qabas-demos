import { useState } from "react";
import { Link } from "react-router-dom";
import { BrailleCell, Mascot, Sparkles } from "@/components/brand";
import { Button } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Section } from "@/components/layout";
import { useLocale } from "@/hooks/use-locale";
import type { SolutionContent } from "../types";

interface SolutionPageContentProps {
  content: SolutionContent;
}

function TranslatorDemo() {
  const { t } = useLocale();
  const [pattern, setPattern] = useState([true, true, false, false, true, false]);
  const letters = ["ق", "ب", "س", "ن"];
  const result = letters[pattern.filter(Boolean).length % letters.length];
  return <div className="rounded-section border border-line bg-surface p-6 shadow-lg md:p-10">
    <div className="flex flex-wrap items-center justify-between gap-3"><span className="flex items-center gap-2 text-sm font-bold text-purple"><i className="size-2 rounded-full bg-success" />{t("solutionContent.demoTitle")}</span><small className="text-ink-muted">{t("solutionContent.demoHint")}</small></div>
    <div className="grid items-center gap-8 py-10 md:grid-cols-[1fr_auto_1fr]"><div><label className="text-sm font-bold">{t("solutionContent.inputLabel")}</label><div className="mx-auto mt-4 grid max-w-28 grid-cols-2 gap-3" dir="ltr">{pattern.map((on, index) => <button className={`aspect-square rounded-full border-2 transition-colors ${on ? "border-purple bg-purple" : "border-line bg-surface-soft"}`} key={index} onClick={() => setPattern((current) => current.map((value, item) => item === index ? !value : value))} aria-label={`${t("solutionContent.dot")} ${index + 1}`} type="button" />)}</div></div><span className="rotate-90 text-3xl text-amber md:rotate-0" aria-hidden="true">→</span><div className="text-center"><label className="text-sm font-bold">{t("solutionContent.outputLabel")}</label><strong className="mt-3 block text-8xl text-purple">{result}</strong><span className="text-sm text-success">{t("solutionContent.confidence")} 96%</span></div></div>
    <div className="flex flex-wrap gap-3 border-t border-line pt-6"><Button>{t("solutionContent.listen")} <span aria-hidden="true">▶</span></Button><Button variant="secondary">{t("solutionContent.copy")}</Button></div>
  </div>;
}

export function SolutionPageContent({ content }: SolutionPageContentProps) {
  const { locale, t } = useLocale();
  return <main>
    <section className="relative overflow-hidden"><div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:min-h-[34rem] lg:grid-cols-[1.1fr_.9fr]"><div><p className="flex items-center gap-2 text-sm font-bold text-purple"><BrailleCell size="sm" />{t("solutionContent.eyebrow")}</p><h1 className="mt-5 max-w-2xl text-5xl font-extrabold tracking-tight sm:text-6xl">{t("solutionContent.heroTitle")}</h1><p className="mt-6 max-w-xl text-lg leading-9 text-ink-muted">{t("solutionContent.heroDescription")}</p><a className="mt-8 inline-flex min-h-12 items-center rounded-control bg-primary px-6 font-bold text-white" href="#demo">{t("solutionContent.tryNow")} <span className="ms-2" aria-hidden="true">→</span></a></div><div className="relative grid min-h-64 place-items-center rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-mint/20"><Mascot className="h-56 w-56" pose="success" /><Sparkles className="absolute end-10 top-8 text-amber" /></div></div></section>
    <Section id="demo" className="pt-0"><TranslatorDemo /></Section>
    <Section className="pt-0"><div className="space-y-10">{content.features.map((feature, index) => <Reveal className="grid items-center gap-10 md:grid-cols-2 md:gap-20" key={feature.kind}><div className={index % 2 ? "md:order-2" : ""}><p className="text-sm font-bold text-purple">0{index + 1}</p><h2 className="mt-3 text-4xl font-bold">{feature.title[locale]}</h2><p className="mt-5 leading-8 text-ink-muted">{feature.description[locale]}</p><ul className="mt-6 space-y-3 text-sm font-semibold"><li className="flex gap-2"><span className="text-success">✓</span>{t("solutionContent.beginner")}</li><li className="flex gap-2"><span className="text-success">✓</span>{t("solutionContent.accessible")}</li></ul></div><div className={`grid min-h-64 place-items-center rounded-section ${["bg-sky/25", "bg-mint/25", "bg-pink/25"][index]} ${index % 2 ? "md:order-1" : ""}`}><div className="flex items-center gap-5 rounded-card bg-surface p-8 text-purple shadow-lg"><BrailleCell size="lg" /><span className="text-3xl text-amber">→</span><strong className="text-3xl">{feature.kind === "translate" ? "العربية" : feature.kind === "share" ? "♥" : "⌗"}</strong></div></div></Reveal>)}</div></Section>
    <Section className="pt-0"><div className="mb-10 max-w-2xl"><p className="text-sm font-bold text-purple">{t("solutionContent.comparisonEyebrow")}</p><h2 className="mt-3 text-4xl font-bold">{t("solutionContent.comparisonTitle")}</h2></div><div className="overflow-hidden rounded-section border border-line bg-surface shadow-sm"><div className="grid grid-cols-[1fr_6rem_6rem] gap-4 bg-surface-soft p-5 text-sm font-bold"><span>{t("solutionContent.capability")}</span><b>QABAS</b><span>{t("solutionContent.traditional")}</span></div>{content.comparison.map((row) => <div className="grid grid-cols-[1fr_6rem_6rem] gap-4 border-t border-line p-5 text-sm" key={row.label.en}><span>{row.label[locale]}</span><i className={row.qabas ? "text-success" : "text-ink-muted"}>{row.qabas ? "✓" : "—"}</i><i className={row.traditional ? "text-success" : "text-ink-muted"}>{row.traditional ? "✓" : "—"}</i></div>)}</div></Section>
    <Section className="pt-0"><div className="grid items-center gap-8 rounded-section bg-surface-soft p-8 md:grid-cols-[.7fr_1.3fr] md:p-12"><Mascot className="mx-auto h-44 w-44" pose="success" /><div><p className="text-sm font-bold text-purple">{t("homeContent.beginTogether")}</p><h2 className="mt-3 text-4xl font-bold">{t("homeContent.everyDot")}</h2><p className="mt-4 text-ink-muted">{t("homeContent.joinUs")}</p><Link to={`/${locale}/contact`} className="mt-6 inline-flex min-h-12 items-center rounded-control bg-primary px-6 font-bold text-white">{t("homeContent.talkToUs")}</Link></div></div></Section>
  </main>;
}
