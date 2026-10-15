import { Link } from "react-router-dom";
import { Logo } from "@/components/brand";
import { useLocale } from "@/hooks/use-locale";
import { Container } from "./container";

export function Footer() {
  const { locale, t } = useLocale();
  return (
    <footer className="border-t border-line bg-surface-soft py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div><Logo /><p className="mt-5 max-w-sm text-ink-muted">{t("footer.description")}</p></div>
          <div><h2 className="font-bold">{t("footer.explore")}</h2><nav className="mt-4 flex flex-col items-start gap-3 text-ink-muted">{(["about", "solution", "impact", "team"] as const).map((key) => <Link key={key} to={`/${locale}/${key}`}>{t(`nav.${key}`)}</Link>)}</nav></div>
          <div><h2 className="font-bold">{t("footer.contact")}</h2><div className="mt-4 flex flex-col gap-3 text-ink-muted"><a href="mailto:qabas.ai.team@gmail.com">qabas.ai.team@gmail.com</a><a href="tel:+201212342342">+20 121 234 2342</a><span>{t("footer.hours")}</span></div></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between"><span>{t("footer.copyright")}</span><span>{t("footer.rights")}</span></div>
      </Container>
    </footer>
  );
}
