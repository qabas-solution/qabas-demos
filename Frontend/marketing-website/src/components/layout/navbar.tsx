import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "@/components/brand";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./language-switcher";
import { LiteModeToggle } from "./lite-mode-toggle";
import { ThemeToggle } from "./theme-toggle";

const links = [
  ["about", "about"],
  ["challenge", "challenge"],
  ["solution", "solution"],
  ["impact", "impact"],
  ["awards", "awards"],
  ["team", "team"],
  ["contact", "contact"],
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, t } = useLocale();
  return (
    <header className="sticky top-0 z-40 border-b border-line/75 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between gap-4 px-6">
        <NavLink aria-label={t("brand")} to={`/${locale}`} onClick={() => setIsOpen(false)}><Logo /></NavLink>
        <button aria-expanded={isOpen} aria-label={t("toggleMenu")} className="order-last size-11 rounded-control border border-line lg:hidden" type="button" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "×" : "☰"}</button>
        <nav className={cn("absolute inset-x-4 top-[4.5rem] hidden flex-col gap-1 rounded-card border border-line bg-surface p-3 shadow-lg lg:static lg:flex lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none", isOpen && "flex")} aria-label={t("mainNavigation")}>
          {links.map(([path, key]) => <NavLink className={({ isActive }) => cn("rounded-control px-3 py-2 text-sm font-semibold text-ink-muted hover:text-ink", isActive && "bg-surface-soft text-ink")} key={path} to={`/${locale}/${path}`} onClick={() => setIsOpen(false)}>{t(`nav.${key}`)}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <LiteModeToggle />
        </div>
      </div>
    </header>
  );
}
