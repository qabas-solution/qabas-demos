import {
  Component, createContext, useContext, useEffect, useId,   useMemo, useRef, useState, type CSSProperties,
  type FormEvent, type ReactNode,
} from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useSiteConfig } from "@/config/SiteConfigProvider";
import type { SiteConfig } from "@/config/site-config.schema";
import EffectsLayer from "@/features/effects/EffectsLayer";
import HeroScene from "@/features/home/scenes/HeroScene";
import { contactSchema } from "@/features/contact/contact.schema";
import { sendContactMessage } from "@/features/contact/send-contact-message";
import { hasEmailConfig } from "@/config/env";

type Language = "ar" | "en";
type Theme = "light" | "dark" | "auto";
type SiteContextValue = {
  language: Language; setLanguage: (value: Language) => void;
  theme: Theme; setTheme: (value: Theme) => void;
  lite: boolean; setLite: (value: boolean) => void;
  t: (ar: string, en: string) => string;
};

const SiteContext = createContext<SiteContextValue | null>(null);
const useSite = () => useContext(SiteContext)!;

class SiteErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) console.error("A site section failed to render", error)
  }
  render() {
    return this.state.failed ? <EmptyPageState /> : this.props.children
  }
}

type IconName = "arrow" | "check" | "chevron" | "close" | "code" | "email" | "facebook" | "github" | "heart" | "instagram" | "language" | "linkedin" | "location" | "menu" | "moon" | "phone" | "play" | "scan" | "sparkle" | "sun" | "trophy" | "users";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1 0S17.9-.4 15 1.5a13.4 13.4 0 0 0-6 0C6.1-.4 4.9 0 4.9 0a5.4 5.4 0 0 0-.2 3A5.8 5.8 0 0 0 3.2 7c0 5.8 3.5 7 6.8 7.4A4.8 4.8 0 0 0 9 18v4" /><path d="M9 19c-3 .9-3-1.5-4-2" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    language: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    linkedin: <><path d="M6 9v11M6 5v.01M10 20V9h4v2c1-2 6-3 6 3v6M3 9h6" /></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    moon: <path d="M20.5 14.2A8 8 0 0 1 9.8 3.5 9 9 0 1 0 20.5 14.2Z" />,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />,
    play: <path d="m9 6 9 6-9 6V6Z" />,
    scan: <><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" /><circle cx="9" cy="9" r="1" /><circle cx="15" cy="9" r="1" /><circle cx="9" cy="15" r="1" /><circle cx="15" cy="15" r="1" /></>,
    sparkle: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" /></>,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Braille({ large = false }: { large?: boolean }) {
  return <span className={`m-braille ${large ? "large" : ""}`} aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</span>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <span className="m-logo" aria-label="QABAS Arabic Braille Solutions">
    <span className="m-logo-flame"><svg viewBox="0 0 52 58"><defs><linearGradient id={`mf-${compact}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2A3A8C" /><stop offset=".38" stopColor="#6E2C8B" /><stop offset=".72" stopColor="#E07A4F" /><stop offset="1" stopColor="#FBB03B" /></linearGradient></defs><path fill={`url(#mf-${compact})`} d="M27 1c4 11-3 15 5 22 2-7 7-9 8-15 8 8 13 18 10 30-3 12-13 19-25 19S3 49 2 37C1 25 9 17 18 10c0 7 1 10 4 13 2-8 3-14 5-22Z" />{[18, 27, 36].flatMap(y => [20, 30].map(x => <circle key={`${x}${y}`} cx={x} cy={y} r="2.5" fill="#FFF6E8" />))}</svg><i><Icon name="sparkle" size={12} /></i></span>
    {!compact && <span><b>قبس</b><small>QABAS</small></span>}
  </span>;
}

type MascotPose = "hero" | "idle" | "reading" | "thinking" | "success" | "error" | "lost" | "sleeping";

function Mascot({ mood = "idle", className = "" }: { mood?: MascotPose | "happy" | "sad" | "wave"; className?: string }) {
  const pose: MascotPose = mood === "happy" ? "idle" : mood === "sad" ? "error" : mood === "wave" ? "hero" : mood;
  const gradientId = `qabas-${useId().replace(/:/g, "")}`;
  const closedEyes = pose === "success" || pose === "sleeping";
  const worried = pose === "error" || pose === "lost";
  const thinking = pose === "thinking";
  return <svg className={`mascot mascot-svg qabas-mascot q-${pose} ${className}`} viewBox="0 0 400 400" role="img" aria-label={`Qabas mascot, ${pose} pose`}>
    <defs>
      <linearGradient id={gradientId} x1=".2" y1="1" x2=".75" y2="0"><stop stopColor="var(--q-primary,#2A3A8C)" /><stop offset=".38" stopColor="var(--q-purple,#6E2C8B)" /><stop offset=".72" stopColor="var(--q-coral,#E07A4F)" /><stop offset="1" stopColor="var(--q-amber,#FBB03B)" /></linearGradient>
      <symbol id={`spark-${gradientId}`} viewBox="0 0 40 40"><path d="M20 0c2 13 7 18 20 20-13 2-18 7-20 20-2-13-7-18-20-20C13 18 18 13 20 0Z" /></symbol>
    </defs>
    <g id="body">
      <path d="M196 42c24 61 78 79 91 142 18 91-34 158-89 158-70 0-111-52-99-121 9-51 52-74 65-135 12 37 21 48 35 58-7-38-5-72-3-102Z" fill={`url(#${gradientId})`} />
      <path id="flame-tip" d="M196 42c24 61 78 79 91 142-28-36-51-44-88-40-7-38-5-72-3-102Z" fill="var(--q-amber,#FBB03B)" opacity=".8" />
      <path d="M132 171c10-45 31-65 45-82-5 47 8 64 19 76-29 6-48 23-64 51Z" fill="#FFF6E8" opacity=".18" />
      <g id="eyes">
        {closedEyes ? <><path id="eye-left" d="M151 190q15 12 30 0" fill="none" stroke="var(--q-ink,#1E2B63)" strokeWidth="7" strokeLinecap="round" /><path id="eye-right" d="M213 190q15 12 30 0" fill="none" stroke="var(--q-ink,#1E2B63)" strokeWidth="7" strokeLinecap="round" /></> :
          <><ellipse id="eye-left" cx={thinking ? 170 : pose === "lost" ? 161 : 166} cy={thinking ? 178 : worried ? 190 : 185} rx="12" ry="16" fill="var(--q-ink,#1E2B63)" /><ellipse id="eye-right" cx={thinking ? 232 : pose === "lost" ? 223 : 228} cy={thinking ? 178 : worried ? 190 : 185} rx="12" ry="16" fill="var(--q-ink,#1E2B63)" /><circle cx={thinking ? 166 : 162} cy={thinking ? 173 : worried ? 185 : 180} r="4" fill="#FFF6E8" /><circle cx={thinking ? 228 : 224} cy={thinking ? 173 : worried ? 185 : 180} r="4" fill="#FFF6E8" /></>}
      </g>
      {thinking ? <circle id="mouth" cx="200" cy="220" r="7" fill="var(--q-ink,#1E2B63)" /> : worried ? <path id="mouth" d="M181 229Q198 213 215 229" fill="none" stroke="var(--q-ink,#1E2B63)" strokeWidth="7" strokeLinecap="round" /> : pose === "success" ? <path id="mouth" d="M176 215Q198 242 220 215Z" fill="var(--q-ink,#1E2B63)" /> : <path id="mouth" d="M180 215Q198 231 216 215" fill="none" stroke="var(--q-ink,#1E2B63)" strokeWidth="7" strokeLinecap="round" />}
      <g id="cheeks" fill="var(--q-pink,#FF7AC6)" opacity=".4"><ellipse cx="140" cy="215" rx="17" ry="8" /><ellipse cx="255" cy="215" rx="17" ry="8" /></g>
      <g id="arm-left"><path d="M126 226Q91 239 79 217" fill="none" stroke="var(--q-coral,#E07A4F)" strokeWidth="18" strokeLinecap="round" /></g>
      <g id="arm-right"><path d={pose === "hero" ? "M272 225Q316 210 326 171" : pose === "lost" ? "M270 228Q300 237 321 218" : "M272 225Q306 240 319 215"} fill="none" stroke="var(--q-coral,#E07A4F)" strokeWidth="18" strokeLinecap="round" /></g>
      <g id="braille-dots" fill="var(--q-gold,#C98F55)">{[[181,257],[181,279],[181,301],[215,257],[215,279],[215,301]].map(([x,y],i)=><circle id={`dot-${i+1}`} cx={x} cy={y} r="7" key={i} />)}</g>
    </g>
    {pose === "thinking" && <g id="orbit-dots" fill="var(--q-gold,#C98F55)"><circle cx="118" cy="245" r="7" /><circle cx="282" cy="245" r="7" /><circle cx="200" cy="345" r="7" /></g>}
    {pose === "lost" && <g id="lantern"><path d="M310 212v-26q0-22 20-22t20 22v26" fill="none" stroke="var(--q-gold,#C98F55)" strokeWidth="7" /><rect x="304" y="204" width="52" height="66" rx="14" fill="var(--q-gold,#C98F55)" /><path id="lantern-flame" d="M319 250q11-36 22 0Z" fill="var(--q-amber,#FBB03B)" /></g>}
    {pose === "sleeping" && <g id="zzz" fill="none" stroke="var(--q-gold,#C98F55)" strokeWidth="6" strokeLinecap="round"><path d="m290 128 22 0-22 22h22" /><path d="m326 90 16 0-16 16h16" /></g>}
    <g fill="var(--q-gold,#C98F55)"><use id="sparkle-1" href={`#spark-${gradientId}`} x="65" y="95" width="28" /><use id="sparkle-2" href={`#spark-${gradientId}`} x="298" y="102" width="20" /><use id="sparkle-3" href={`#spark-${gradientId}`} x="292" y="302" width="15" /></g>
  </svg>;
}

function Button({ children, to, secondary = false, onClick, type = "button", disabled = false }: { children: ReactNode; to?: string; secondary?: boolean; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }) {
  const cls = `m-btn ${secondary ? "secondary" : ""}`;
  return to ? <Link className={cls} to={to}>{children}</Link> : <button type={type} className={cls} onClick={onClick} disabled={disabled}>{children}</button>;
}

const pageLinks = [
  ["about", "من نحن", "About"], ["challenge", "التحدّي", "Challenge"], ["solution", "الحل", "Solution"],
  ["impact", "الأثر", "Impact"], ["awards", "الجوائز", "Awards"], ["team", "الفريق", "Team"], ["contact", "تواصل", "Contact"],
];

function Header() {
  const { language, setLanguage, theme, setTheme, t } = useSite();
  const config = useSiteConfig();
  const [open, setOpen] = useState(false);
  return <header className="m-header"><div className="m-nav">
    <Link to="/" onClick={() => setOpen(false)}><Logo /></Link>
    <nav className={open ? "open" : ""} aria-label={t("التنقل الرئيسي", "Main navigation")}>
      {config.navbar.items.filter((item) => item.visible && config.pages[item.id]?.enabled).sort((a, b) => a.order - b.order).map((item) => <NavLink key={item.id} to={`/${item.id}`} onClick={() => setOpen(false)}>{item.labels[language]}</NavLink>)}
    </nav>
    <div className="m-nav-actions">
      <button className="m-icon-btn language-btn" onClick={() => setLanguage(language === "ar" ? "en" : "ar")} aria-label={t("English", "العربية")}><Icon name="language" size={17} /><b>{language === "ar" ? "EN" : "ع"}</b></button>
      <button className="m-icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={t("تبديل المظهر", "Toggle theme")}><Icon name={theme === "dark" ? "sun" : "moon"} /></button>
      <button className="m-icon-btn nav-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t("القائمة", "Menu")}><Icon name={open ? "close" : "menu"} /></button>
    </div>
  </div></header>;
}

function Footer() {
  const { language, setLanguage, theme, setTheme, t } = useSite();
  const config = useSiteConfig();
  return <footer className="m-footer">
    <div className="footer-dots" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <Braille key={i} />)}</div>
    <div className="footer-main">
      <div className="footer-brand"><Logo /><p>{t("نضيء الطريق إلى محتوى عربي متاح لكل قارئ.", "Lighting the way to accessible Arabic content for every reader.")}</p>{config.footer.newsletter && <form className="newsletter" onSubmit={e => e.preventDefault()}><label htmlFor="newsletter">{t("رسالة دافئة كل شهر", "A warm note, once a month")}</label><span><input id="newsletter" type="email" placeholder={t("بريدك الإلكتروني", "Your email")} /><button aria-label={t("اشتراك", "Subscribe")}><Icon name="arrow" /></button></span></form>}</div>
      {config.footer.columns && <><div className="footer-col"><b>{t("الصفحات", "Pages")}</b>{pageLinks.filter(([p]) => config.pages[p]?.enabled).slice(0, 5).map(([p, ar, en]) => <Link key={p} to={`/${p}`}>{t(ar, en)}</Link>)}</div>
      <div className="footer-col"><b>{t("المصادر", "Resources")}</b><Link to="/solution">{t("كيف يعمل قبس", "How Qabas works")}</Link><Link to="/impact">{t("تقارير الأثر", "Impact reports")}</Link><Link to="/contact">{t("الدعم والمساعدة", "Help & support")}</Link></div></>}
      <div className="footer-contact"><b>{t("تواصل معنا", "Reach us")}</b><span><Icon name="location" />{t("الرياض، المملكة العربية السعودية", "El-Mansoura, Egypt")}</span><a href={`mailto:${config.contact.email}`}><Icon name="email" />{config.contact.email}</a><a href="tel:+20 121 234 2342"><Icon name="phone" />+20 121 234 2342</a><small>{t("الأحد–الخميس، ٩ص–٥م", "Sun–Thu, 9am–5pm")}</small>{config.footer.social && <div className="socials">{(["linkedin", "facebook", "instagram", "github"] as IconName[]).map(x => <a href="#" aria-label={x} key={x}><Icon name={x} size={18} /></a>)}</div>}</div>
    </div>
    {config.footer.map && <div className="map-card"><div className="map-roads"><i /><i /><i /><span /><span /></div><div className="map-pin"><Logo compact /></div><div className="map-label"><b>{t("بيت قبس", "QABAS home")}</b><small>{t("حي الابتكار، المنصورة", "Innovation District, El Mansoura")}</small></div><a href="https://maps.app.goo.gl/jSUYuWNQnuKEozJRA" target="_blank" rel="noreferrer" className="map-button"><Icon name="location" size={17} />{t("افتح في خرائط Google", "Open in Google Maps")}</a></div>}
    {/* <div className="giant-wordmark"><span>قبس</span> QABAS</div> */}
    <div className="footer-bottom"><span>© 2026 QABAS · {t("صُنع بـ", "Made with")} <Icon name="heart" size={13} /> {t("بواسطة فريق قبس", "by the Qabas team")}</span><div><button onClick={() => setLanguage(language === "ar" ? "en" : "ar")}><Icon name="language" size={15} />{language === "ar" ? "English" : "العربية"}</button><button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><Icon name={theme === "dark" ? "sun" : "moon"} size={15} />{t("المظهر", "Theme")}</button></div></div>
  </footer>;
}

function Onboarding({ onDone }: { onDone: () => void }) {
  const { language, setLanguage, theme, setTheme, lite, setLite, t } = useSite();
  const [step, setStep] = useState(0);
  useEffect(() => { if (step === 0) { const timer = window.setTimeout(() => setStep(1), 2100); return () => clearTimeout(timer); } }, [step]);
  const finish = () => { localStorage.setItem("qabas-welcomed", "1"); onDone(); };
  return <div className={`onboarding step-${step}`} role="dialog" aria-modal="true" aria-label={t("إعداد قبس", "Set up QABAS")}>
    <button className="onboard-skip" onClick={finish}>{t("تخطّي", "Skip")}</button>
    <div className="onboard-progress">{[0, 1, 2, 3].map(i => <i className={i <= step ? "active" : ""} key={i} />)}</div>
    {step === 0 && <div className="onboard-logo"><div className="forming-logo"><Logo compact /><Braille large /></div><h1>قبس</h1><p>Arabic Braille Solutions</p></div>}
    {step === 1 && <OnboardCard icon="language" title="أهلاً بك في قبس" sub="Choose your language"><div className="choice-grid"><button className={language === "ar" ? "chosen" : ""} onClick={() => setLanguage("ar")}><b>العربية</b><small>مرحباً بك</small></button><button className={language === "en" ? "chosen" : ""} onClick={() => setLanguage("en")}><b>English</b><small>Welcome</small></button></div><Button onClick={() => setStep(2)}>{t("التالي", "Continue")}<Icon name="arrow" /></Button></OnboardCard>}
    {step === 2 && <OnboardCard icon="sun" title={t("اختر المظهر", "Choose your theme")} sub={t("يمكنك تغييره في أي وقت", "You can change it anytime")}><div className="theme-choices">{(["light", "dark", "auto"] as Theme[]).map(x => <button key={x} className={theme === x ? "chosen" : ""} onClick={() => setTheme(x)}><Icon name={x === "dark" ? "moon" : "sun"} /><b>{x === "light" ? t("فاتح", "Light") : x === "dark" ? t("داكن", "Dark") : t("تلقائي", "Auto")}</b></button>)}</div><Button onClick={() => setStep(3)}>{t("التالي", "Continue")}<Icon name="arrow" /></Button></OnboardCard>}
    {step === 3 && <OnboardCard icon="sparkle" title={t("كيف تحب الحركة؟", "How should QABAS move?")} sub={t("اختر الأنسب لجهازك", "Choose what works for your device")}><div className="choice-grid motion-choice"><button className={!lite ? "chosen" : ""} onClick={() => setLite(false)}><Icon name="sparkle" /><b>{t("حركة سلسة", "Smooth motion")}</b><small>{t("للتجربة الكاملة", "The full experience")}</small></button><button className={lite ? "chosen" : ""} onClick={() => setLite(true)}><Braille /><b>{t("وضع خفيف", "Lite mode")}</b><small>{t("للأجهزة الأبطأ", "For slower devices")}</small></button></div><Button onClick={finish}>{t("ابدأ مع قبس", "Enter QABAS")}<Icon name="arrow" /></Button></OnboardCard>}
  </div>;
}

function OnboardCard({ icon, title, sub, children }: { icon: IconName; title: string; sub: string; children: ReactNode }) {
  return <div className="onboard-card"><span className="onboard-icon"><Icon name={icon} /></span><h2>{title}</h2><p>{sub}</p>{children}</div>;
}

function RouteLoader() {
  const { t } = useSite();
  return <div className="route-loader" role="status" aria-live="polite"><div className="loader-mark"><Logo compact /><div className="q-cell-loader">{Array.from({length:6},(_,i)=><i key={i} />)}</div></div><h2>قبس</h2><p>{t("جاري التحميل…", "Loading…")}</p><span className="loader-glow" /></div>;
}

export function RootLayout() {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem("qabas-language") as Language) || "ar");
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem("qabas-theme") as Theme) || "light");
  const [lite, setLiteState] = useState(() => localStorage.getItem("qabas-lite") === "1");
  const [welcomed, setWelcomed] = useState(() => localStorage.getItem("qabas-welcomed") === "1");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const config = useSiteConfig();

  const setLanguage = (v: Language) => { setLanguageState(v); localStorage.setItem("qabas-language", v); };
  const setTheme = (v: Theme) => { setThemeState(v); localStorage.setItem("qabas-theme", v); };
  const setLite = (v: boolean) => { setLiteState(v); localStorage.setItem("qabas-lite", v ? "1" : "0"); };
  const isDark = theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const t = (ar: string, en: string) => language === "ar" ? ar : en;
  const value = useMemo(() => ({ language, setLanguage, theme, setTheme, lite, setLite, t }), [language, theme, lite]);

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    const configuredTheme = config.theme.mode === "system" ? "auto" : config.theme.mode;
    setThemeState(configuredTheme);
    setLiteState(config.defaults.lite);
  }, [config.theme.mode, config.defaults.lite]);
  useEffect(() => {
    window.scrollTo(0, 0); setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), lite ? 80 : 420);
    return () => clearTimeout(timer);
  }, [location.pathname, lite]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); } }), { threshold: .12 });
    const timer = setTimeout(() => document.querySelectorAll(".reveal:not(.revealed)").forEach(el => observer.observe(el)), 50);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [location.pathname]);

  const pageId = location.pathname.split("/")[1] || "home";
  const pageDisabled = pageId !== "404" && pageId !== "loading" && config.pages[pageId] && !config.pages[pageId].enabled;
  return <SiteContext.Provider value={value}><div className={`marketing-site ${isDark ? "m-dark" : "m-light"} ${lite ? "m-lite" : ""}`}>
    <EffectsLayer lite={lite} />
    {!welcomed && <Onboarding onDone={() => setWelcomed(true)} />}
    {loading && welcomed && <RouteLoader />}
    <Header /><SiteErrorBoundary>{pageDisabled ? <NotFound /> : <Outlet />}</SiteErrorBoundary><Footer />
  </div></SiteContext.Provider>;
}

function Eyebrow({ children }: { children: ReactNode }) { return <span className="m-eyebrow"><Braille />{children}</span>; }
function LearnMore({ to }: { to: string }) { const { t } = useSite(); return <Link className="learn-more" to={to}>{t("اعرف المزيد", "Learn more")}<Icon name="arrow" size={17} /></Link>; }

function PageHero({ eyebrow, title, text, children, compact = false }: { eyebrow: string; title: string; text: string; children?: ReactNode; compact?: boolean }) {
  return <section className={`page-hero ${compact ? "compact" : ""}`}><div className="hero-dots" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <Braille key={i} />)}</div><div className="page-hero-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p>{children}</div><div className="page-hero-art"><Mascot mood="wave" /><span className="hero-ring r1" /><span className="hero-ring r2" /><i className="hs1"><Icon name="sparkle" /></i><i className="hs2"><Icon name="sparkle" size={15} /></i></div></section>;
}

function ClosingCta() {
  const { t } = useSite();
  return <section className="closing-cta reveal"><Mascot /><Eyebrow>{t("لنبدأ معاً", "Let’s begin")}</Eyebrow><h2>{t("كل نقطة قد تفتح عالماً", "Every dot can open a world")}</h2><p>{t("انضم إلينا لنصنع مستقبلاً عربياً أكثر وصولاً.", "Join us in making the Arabic world more accessible.")}</p><div><Button to="/solution">{t("جرّب المنصة", "Try the platform")}<Icon name="arrow" /></Button><Button to="/contact" secondary>{t("تواصل معنا", "Talk to us")}</Button></div></section>;
}

function Stats({ items }: { items: [string, string, string][] }) {
  const { t } = useSite();
  return <div className="m-stats reveal">{items.map(([value, ar, en]) => <div key={value}><strong>{value}</strong><span>{t(ar, en)}</span><Braille /></div>)}</div>;
}

function ConfiguredSection({ page, id, children }: { page: string; id: string; children: ReactNode }) {
  const config = useSiteConfig()
  const section = config.pages[page]?.sections.find((item) => item.id === id)
  return section?.visible === false ? null : <section data-section-id={id}>{children}</section>
}

function EmptyPageState() {
  const { t } = useSite()
  return <section className="page-section empty-state"><Mascot mood="lost" /><h1>{t("هذه الصفحة قيد الترتيب", "This page is taking a quiet moment")}</h1><p>{t("يمكنك العودة إلى الصفحة الرئيسية للمتابعة.", "Return home to keep exploring.")}</p><Button to="/">{t("العودة للرئيسية", "Back home")}</Button></section>
}

function isDataVisible(config: SiteConfig, key: string, id: string) {
  return config.dataOverrides[key]?.find((item) => item.id === id)?.visible !== false
}

export function Home() {
  const { t, language } = useSite();
  const config = useSiteConfig();
  const sections = config.pages.home.sections.filter((section) => section.visible);
  if (sections.length === 0) return <main><EmptyPageState /></main>;
  const teasers = [
    ["about", "sky", "من نحن", "About us", "فريق صغير يحمل حلماً كبيراً: أن تكون المعرفة العربية في متناول الجميع.", "A small team with one big belief: Arabic knowledge should be within everyone’s reach."],
    ["challenge", "pink", "التحدّي", "The challenge", "الأدوات العربية لبرايل قليلة، بطيئة، وغالباً بعيدة عن العائلة والمعلم.", "Arabic Braille tools are scarce, slow, and often out of reach for families and teachers."],
    ["solution", "mint", "حل قبس", "The Qabas solution", "من نقاط برايل إلى نص عربي واضح في لحظات، عبر تجربة بسيطة وآمنة.", "From Braille dots to clear Arabic in moments, through a simple and safe experience."],
    ["impact", "lemon", "أثرنا", "Our impact", "نقيس ما نصنعه بالكلمات المقروءة والفرص التي أصبحت أقرب.", "We measure what we build in words read and opportunities brought closer."],
  ];
  return <main>
    <ConfiguredSection page="home" id="hero"><HeroScene language={language} /></ConfiguredSection>
    {config.hero.showStats && <ConfiguredSection page="home" id="stats"><Stats items={[["12K+", "كلمة مترجمة", "words translated"], ["480+", "مستفيداً", "people reached"], ["38", "مدرسة شريكة", "partner schools"], ["96%", "دقّة أولية", "early accuracy"]]} /></ConfiguredSection>}
    <ConfiguredSection page="home" id="how"><div className="how-strip reveal"><div><Eyebrow>{t("بثلاث خطوات", "Three simple steps")}</Eyebrow><h2>{t("هكذا يعمل قبس", "How QABAS works")}</h2></div>{[[<Icon name="scan" />, "01", t("امسح أو اكتب برايل", "Scan or type Braille")], [<Braille large />, "02", t("نترجم النقاط", "We translate the dots")], [<strong key="a">ع</strong>, "03", t("اقرأ العربية", "Read clear Arabic")]].map(([icon, num, label]) => <article key={String(num)}><span>{icon}</span><small>{num as string}</small><b>{label}</b></article>)}</div></ConfiguredSection>
    <ConfiguredSection page="home" id="stories"><div className="story-sections">{teasers.map(([path, color, arTitle, enTitle, arText, enText], i) => <article className={`teaser-row reveal ${i % 2 ? "reverse" : ""}`} key={path}><div className={`teaser-visual ${color}`}><span className="visual-number">0{i + 1}</span>{path === "about" && <Mascot mood="wave" />}{path === "challenge" && <div className="empty-book"><Braille large /><i /><i /><i /></div>}{path === "solution" && <div className="mini-translator"><Braille large /><Icon name="arrow" /><b>نور</b></div>}{path === "impact" && <div className="mini-bars">{[45, 68, 55, 90, 78].map((n, x) => <i style={{ height: `${n}%` }} key={x} />)}</div>}</div><div><Eyebrow>{t(arTitle, enTitle)}</Eyebrow><h2>{t(arTitle, enTitle)}</h2><p>{t(arText, enText)}</p><LearnMore to={`/${path}`} /></div></article>)}</div></ConfiguredSection>
    <ConfiguredSection page="home" id="quote"><div className="home-quote reveal"><Icon name="sparkle" /><blockquote>{t("حين يستطيع طفلي أن يقرأ بنفسه، لا تكون الترجمة مجرد تقنية… بل نافذة جديدة.", "When my child can read independently, translation is no longer just technology—it is a new window.")}</blockquote><div><span>أ</span><p><b>{t("أمّ أحد المستفيدين", "Parent of a QABAS learner")}</b><small>{t("برنامج التجربة الأولية", "Early pilot program")}</small></p></div></div></ConfiguredSection>
    <ConfiguredSection page="home" id="closing"><ClosingCta /></ConfiguredSection>
  </main>;
}

export function About() {
  const { t } = useSite();
  return <main><PageHero eyebrow={t("من نحن", "About QABAS")} title={t("بدأنا بسؤالٍ بسيط", "It started with one simple question")} text={t("ماذا لو استطاعت التقنية أن تقرّب العربية من كل قارئ برايل؟ من هنا وُلد قبس.", "What if technology could bring Arabic closer to every Braille reader? That question became QABAS.")} />
    <section className="dual-mission reveal"><article><span>01</span><Eyebrow>{t("مهمتنا", "Our mission")}</Eyebrow><h2>{t("إزالة الحواجز، نقطةً نقطة", "Remove barriers, dot by dot")}</h2><p>{t("نبني أدوات عربية سهلة وموثوقة تمنح مستخدمي برايل استقلالية أكبر في التعلّم والتواصل.", "We build simple, trusted Arabic tools that give Braille readers more independence in learning and communication.")}</p></article><article><span>02</span><Eyebrow>{t("رؤيتنا", "Our vision")}</Eyebrow><h2>{t("عربية متاحة بلا استثناء", "Accessible Arabic, without exception")}</h2><p>{t("عالمٌ لا تحدد فيه طريقة القراءة فرص المعرفة أو المشاركة.", "A world where the way someone reads never limits their access to knowledge or participation.")}</p></article></section>
    <section className="page-section"><div className="section-head"><Eyebrow>{t("حكايتنا", "Our story")}</Eyebrow><h2>{t("من فكرة جامعية إلى مشروع أثر", "From a university idea to an impact venture")}</h2></div><div className="timeline">{[["2022", "سؤال في قاعة الدراسة", "A question in the classroom"], ["2023", "أول نموذج للترجمة", "Our first translation model"], ["2024", "التجربة مع المدارس", "Piloting with schools"], ["2025", "قبس يصل إلى المزيد", "QABAS reaches further"]].map(([year, ar, en]) => <article className="reveal" key={year}><i /><strong>{year}</strong><h3>{t(ar, en)}</h3><p>{t("تعلّمنا، اختبرنا، واستمعنا للمجتمع في كل خطوة.", "At every step we learned, tested, and listened to the community.")}</p></article>)}</div></section>
    <section className="page-section values"><div className="section-head"><Eyebrow>{t("قيمنا", "Our values")}</Eyebrow><h2>{t("ما يوجّه كل نقطة نصنعها", "What guides every dot we place")}</h2></div><div className="sticker-grid">{[[ "sky", "قريبون", "Human first", "نبدأ دائماً بالاستماع."], ["pink", "شجعان", "Bravely curious", "نسأل ونتعلّم باستمرار."], ["mint", "متاحون", "Accessible always", "الوصول جزء من البداية."], ["lemon", "متعاونون", "Better together", "نبني مع المجتمع، لا عنه."]].map(([c, ar, en, text]) => <article className={`sticker ${c} reveal`} key={ar}><Icon name="sparkle" /><h3>{t(ar, en)}</h3><p>{t(text, "We listen, include, and build with care.")}</p></article>)}</div></section><ClosingCta /></main>;
}

export function Challenge() {
  const { t } = useSite();
  return <main><PageHero eyebrow={t("التحدّي", "The challenge")} title={t("المعرفة موجودة، لكن الوصول إليها ليس متساوياً", "Knowledge is everywhere. Access is not.")} text={t("يواجه قارئو برايل العربي نقصاً حقيقياً في الأدوات الرقمية السريعة والموثوقة.", "Arabic Braille readers face a real shortage of fast, trusted digital tools.")} />
    <section className="page-section"><Stats items={[["1–2%", "من الكتب العربية متاحة ببرايل", "of Arabic books available in Braille"], ["6×", "وقت أطول للتحويل اليدوي", "longer for manual transcription"], ["70%", "من المعلمين يحتاجون أدوات أسهل", "of teachers need simpler tools"], ["∞", "إمكانات تنتظر الوصول", "possibilities waiting"]]} /></section>
    <section className="empathy-story reveal"><div className="story-illustration"><div className="empty-book"><Braille large /><i /><i /><i /></div><Mascot mood="sad" /></div><div><Eyebrow>{t("خلف كل رقم حكاية", "Behind every number is a person")}</Eyebrow><h2>{t("واجبٌ مدرسي لا ينبغي أن يستغرق المساء كله", "Homework should not take the whole evening")}</h2><p>{t("تجلس ليان مع والدتها كل ليلة لتحويل أوراق برايل يدوياً. ليست المشكلة في قدرتها على التعلّم، بل في غياب الأداة التي تصل بين طريقتها في القراءة ومحتوى صفّها.", "Every evening, Layan and her mother manually transcribe Braille worksheets. Her ability is not the barrier—the missing bridge to her classroom content is.")}</p><blockquote>{t("نريد وقتاً أكبر للتعلّم، ووقتاً أقل في التحويل.", "We want more time for learning, and less time spent transcribing.")}</blockquote></div></section>
    <section className="page-section problem-grid">{[["01", t("أدوات قليلة", "Too few tools")], ["02", t("تكلفة مرتفعة", "High cost")], ["03", t("وقت طويل", "Slow processes")], ["04", t("دعم عربي محدود", "Limited Arabic support")]].map(([n, text]) => <article className="reveal" key={n}><strong>{n}</strong><h3>{text}</h3><p>{t("حاجز صغير في الأداة قد يصنع فجوة كبيرة في التجربة.", "A small tool barrier can create a wide gap in someone’s experience.")}</p></article>)}</section><ClosingCta /></main>;
}

function TranslatorDemo() {
  const { t } = useSite();
  const [pattern, setPattern] = useState([true, true, false, false, true, false]);
  const letters = ["ق", "ب", "س", "ن"];
  const result = letters[pattern.filter(Boolean).length % letters.length];
  return <div className="translator-demo reveal"><div className="demo-top"><span><i />{t("تجربة مباشرة", "Interactive demo")}</span><small>{t("اضغط على النقاط", "Tap the dots")}</small></div><div className="translator-body"><div><label>{t("إدخال برايل", "Braille input")}</label><div className="interactive-braille">{pattern.map((on, i) => <button className={on ? "on" : ""} onClick={() => setPattern(x => x.map((v, n) => n === i ? !v : v))} key={i} aria-label={`${t("نقطة", "Dot")} ${i + 1}`} />)}</div></div><Icon name="arrow" /><div className="arabic-output"><label>{t("النص العربي", "Arabic output")}</label><strong>{result}</strong><span>{t("ثقة الترجمة", "Translation confidence")} 96%</span></div></div><div className="demo-actions"><Button>{t("استمع للنص", "Listen")}<Icon name="play" /></Button><Button secondary>{t("نسخ", "Copy")}</Button></div></div>;
}

export function Solution() {
  const { t } = useSite();
  return <main><PageHero eyebrow={t("الحل", "The solution")} title={t("قبس يصل بين النقاط والكلمات", "QABAS connects dots to words")} text={t("منصة عربية تحوّل أنماط برايل إلى نص واضح في تجربة سريعة، دافئة، ومصمّمة للجميع.", "An Arabic-first platform that turns Braille patterns into clear text through a fast, warm, inclusive experience.")}><Button to="#demo">{t("جرّب بنفسك", "Try it now")}<Icon name="arrow" /></Button></PageHero>
    <section className="page-section" id="demo"><TranslatorDemo /></section>
    <section className="feature-rows">{[[t("أدخل بطريقتك", "Input your way"), t("امسح صورة، اكتب النمط، أو استخدم لوحة برايل التفاعلية.", "Scan an image, type a pattern, or use our interactive Braille cell."), "scan"], [t("افهم في لحظات", "Understand in moments"), t("تحويل سريع إلى العربية مع قراءة صوتية ودرجة ثقة واضحة.", "Fast Arabic output with read-aloud support and a clear confidence score."), "translate"], [t("شارك بأمان", "Share with confidence"), t("انسخ واحفظ وشارك المحتوى مع حماية الخصوصية في كل خطوة.", "Copy, save, and share content with privacy built into every step."), "share"]].map(([title, text, kind], i) => <article className={`feature-row reveal ${i % 2 ? "reverse" : ""}`} key={String(title)}><div><Eyebrow>0{i + 1}</Eyebrow><h2>{title}</h2><p>{text}</p><ul><li><Icon name="check" />{t("سهل للمبتدئين", "Easy for beginners")}</li><li><Icon name="check" />{t("مصمم للوصول", "Built for accessibility")}</li></ul></div><div className={`feature-visual ${kind}`}><Braille large /><span>{kind === "translate" ? "العربية" : kind === "share" ? <Icon name="heart" size={38} /> : <Icon name="scan" size={44} />}</span></div></article>)}</section>
    <section className="page-section comparison"><div className="section-head"><Eyebrow>{t("الفرق واضح", "A clearer way")}</Eyebrow><h2>{t("قبس مقابل الطرق التقليدية", "QABAS vs. traditional methods")}</h2></div><div className="comparison-table"><div className="table-head"><span>{t("الميزة", "Capability")}</span><b>QABAS</b><span>{t("التقليدي", "Traditional")}</span></div>{[[t("ترجمة فورية", "Instant translation"), true, false], [t("دعم العربية أولاً", "Arabic-first"), true, false], [t("متاح من أي جهاز", "Works on any device"), true, true], [t("قراءة صوتية", "Text to speech"), true, false], [t("تكلفة منخفضة", "Low cost"), true, false]].map(([label, qabas, old]) => <div key={String(label)}><span>{label}</span><i className={qabas ? "yes" : "no"}>{qabas ? "✓" : "—"}</i><i className={old ? "yes" : "no"}>{old ? "✓" : "—"}</i></div>)}</div></section><ClosingCta /></main>;
}

export function Impact() {
  const { t } = useSite();
  return <main><PageHero eyebrow={t("الأثر", "Our impact")} title={t("نقيس التقدّم بما يتغيّر للناس", "We measure progress in changed lives")} text={t("بيانات تجريبية توضّح كيف يمكن لأداة صغيرة أن تصنع أثراً يتسع كل يوم.", "Our pilot data shows how one small tool can create an impact that grows every day.")} />
    <section className="page-section impact-dashboard reveal"><div className="impact-head"><div><Eyebrow>{t("بيانات تجريبية", "Pilot dataset")}</Eyebrow><h2>{t("الأثر في لمحة", "Impact at a glance")}</h2></div><span>{t("آخر تحديث: مايو 2025", "Updated: May 2025")}</span></div><div className="chart-grid"><article className="bar-chart"><h3>{t("الكلمات المترجمة شهرياً", "Words translated monthly")}</h3><div>{[28, 42, 51, 64, 78, 92].map((n, i) => <span key={i}><i style={{ height: `${n}%` }} /><small>{t(["ديس", "ينا", "فبر", "مار", "أبر", "ماي"][i], ["Dec", "Jan", "Feb", "Mar", "Apr", "May"][i])}</small></span>)}</div></article><article className="donut-card"><h3>{t("رضا المستفيدين", "Beneficiary satisfaction")}</h3><div className="donut"><strong>94%</strong></div><p>{t("قالوا إن قبس جعل المهمة أسهل", "said QABAS made the task easier")}</p></article><article className="reach-card"><span><Icon name="users" /></span><strong>480+</strong><p>{t("مستفيداً مباشراً", "direct beneficiaries")}</p><div><i style={{ width: "82%" }} /></div><small>{t("82% من هدف هذا العام", "82% of this year’s goal")}</small></article></div></section>
    <section className="page-section quotes"><div className="section-head"><Eyebrow>{t("أصوات المجتمع", "Community voices")}</Eyebrow><h2>{t("الأرقام مهمة، والحكايات أهم", "Numbers matter. Stories matter more.")}</h2></div><div className="quote-grid">{[[t("صار بإمكاني تحضير الدرس في نصف الوقت.", "I can prepare lessons in half the time."), t("معلمة تربية خاصة", "Special education teacher")], [t("أحب أن أرى الحرف يظهر فوراً بعد النقاط.", "I love seeing the letter appear right after the dots."), t("طالب، ١١ عاماً", "Student, age 11")], [t("الأداة بسيطة لدرجة أن جدته تستخدمها معه.", "It’s simple enough that his grandmother uses it with him."), t("والد مستفيد", "Parent")]].map(([q, role], i) => <blockquote className={`reveal q${i}`} key={q}><Icon name="sparkle" /><p>“{q}”</p><footer><span>{["م", "ع", "س"][i]}</span><b>{role}</b></footer></blockquote>)}</div></section><ClosingCta /></main>;
}

export function Awards() {
  const { t } = useSite();
  const config = useSiteConfig();
  const awards = [["2025", "جائزة الابتكار الشامل", "Inclusive Innovation Award", "ملتقى التقنية الإنسانية", "Human Tech Forum"], ["2025", "المركز الأول — حلول الوصول", "First Place — Accessibility", "هاكاثون أثر", "Athar Hackathon"], ["2024", "أفضل مشروع طلابي", "Best Student Venture", "جامعة الابتكار", "Innovation University"], ["2024", "اختيار لجنة التحكيم", "Judges’ Choice", "تحدي العربية الرقمية", "Digital Arabic Challenge"], ["2023", "نجم المستقبل", "Rising Star", "مجتمع روّاد الأثر", "Impact Founders"], ["2023", "منحة النمو المبكر", "Early Growth Grant", "مؤسسة تمكين", "Tamkeen Foundation"]];
  return <main><PageHero eyebrow={t("الجوائز", "Awards")} title={t("كل تكريمٍ وقودٌ للشعلة", "Every recognition fuels the flame")} text={t("نحتفل بالجوائز لأنها توسّع رسالتنا وتقرّبنا من أشخاص أكثر.", "We celebrate recognition because it amplifies the mission and helps us reach more people.")} />
    <section className="page-section awards-grid">{awards.map(([year, ar, en, orgAr, orgEn], i) => isDataVisible(config, "awards", String(i)) && <article className={`award-card reveal a${i % 4}`} key={ar}><div className="award-image"><span><Icon name="trophy" size={54} /></span><Braille large /></div><div><span className="award-year">{year}</span><h2>{t(ar, en)}</h2><p>{t(orgAr, orgEn)}</p><small><Icon name="sparkle" size={14} />{t("إنجاز نفخر به", "A proud QABAS moment")}</small></div></article>)}</section><ClosingCta /></main>;
}

const portraits = [
  "https://images.unsplash.com/photo-1783988477253-a73b0e3cebb1?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1765366574945-e2f1b4b1a5b3?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1790575187818-16618fdc7a2d?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1790575169250-1ec839ecde17?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1783853852573-6c48dfa838e5?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1758874574397-e56dfcfc116d?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1739785248579-cd43cdaac06b?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1651596082255-bcb4993cee27?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1761026968170-de145510ca84?auto=format&fit=crop&w=500&q=72",
  "https://images.unsplash.com/photo-1790575169158-20fe5b860301?auto=format&fit=crop&w=500&q=72",
];
const teamData = [
  ["سارة الهاشمي", "Sara Alhashimi", "lead", "المديرة التنفيذية", "CEO"],
  ["عمر القحطاني", "Omar Alqahtani", "tech", "قائد التقنية", "Tech lead"],
  ["نورة السالم", "Noura Alsalem", "design", "تصميم المنتجات", "Product design"],
  ["فيصل العتيبي", "Faisal Alotaibi", "tech", "مهندس تعلم آلي", "ML engineer"],
  ["ريم الحربي", "Reem Alharbi", "impact", "أبحاث الوصول", "Accessibility research"],
  ["خالد منصور", "Khalid Mansour", "tech", "مطور واجهات", "Frontend developer"],
  ["لمى الشريف", "Lama Alsherif", "impact", "الشراكات المجتمعية", "Community partnerships"],
  ["عبدالله ناصر", "Abdullah Nasser", "lead", "تطوير الأعمال", "Business development"],
  ["هيا الأحمد", "Haya Alahmad", "design", "باحثة تجربة المستخدم", "UX researcher"],
  ["يوسف فهد", "Yousef Fahad", "tech", "مهندس بيانات", "Data engineer"],
];

export function Team() {
  const { t } = useSite();
  const config = useSiteConfig();
  const [filter, setFilter] = useState("all");
  return <main><PageHero eyebrow={t("الفريق", "Our team")} title={t("عقول مختلفة، وقلبٌ واحد", "Different minds, one shared heart")} text={t("نحن باحثون ومصممون ومهندسون نجتمع حول هدف واحد: عربية أقرب للجميع.", "We are researchers, designers, and engineers united by one goal: Arabic that is closer to everyone.")} />
    <section className="page-section"><div className="team-filters">{[["all", "الكل", "Everyone"], ["lead", "القيادة", "Leadership"], ["tech", "التقنية", "Technology"], ["design", "التصميم", "Design"], ["impact", "الأثر", "Impact"]].map(([key, ar, en]) => <button className={filter === key ? "active" : ""} onClick={() => setFilter(key)} key={key}>{t(ar, en)}</button>)}</div><div className="team-grid">{teamData.map(([ar, en, role, roleAr, roleEn], i) => (isDataVisible(config, "team", String(i)) && (filter === "all" || filter === role)) && <article className={`team-card reveal c${i % 4}`} key={en}><div className="member-photo"><img src={portraits[i]} alt={t(`صورة ${ar}`, `Portrait of ${en}`)} loading="lazy" /><span><Icon name="sparkle" /></span></div><div><small>{t(roleAr, roleEn)}</small><h2>{t(ar, en)}</h2><p>{t("يؤمن بأن التقنية الأفضل تبدأ بالإنصات.", "Believes the best technology begins by listening.")}</p><span className="member-social"><a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={17} /></a><a href="#" aria-label="GitHub"><Icon name="github" size={17} /></a></span></div></article>)}</div></section><ClosingCta /></main>;
}

export function Contact() {
  const { t, language } = useSite();
  const config = useSiteConfig();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorKind, setErrorKind] = useState<string | undefined>();
  const [open, setOpen] = useState(0);
  const unavailable = !hasEmailConfig();
  const startedAt = useRef(Date.now());
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success || String(values.honeypot || "") || Date.now() - startedAt.current < 3000) {
      setErrorKind("validation");
      setStatus("error");
      return;
    }
    const throttleKey = "qabas-contact-last-send";
    try {
      const last = Number(localStorage.getItem(throttleKey) || 0);
      if (Date.now() - last < 60000) {
        setErrorKind("rate_limit");
        setStatus("error");
        return;
      }
    } catch {}
    setStatus("loading");
    const result = await sendContactMessage(parsed.data, { lang: language, toEmail: config.contact.email });
    if (result.ok) {
      try { localStorage.setItem(throttleKey, String(Date.now())); } catch {}
      form.reset();
      startedAt.current = Date.now();
      setStatus("success");
      return;
    }
    setErrorKind(result.kind);
    setStatus("error");
  };
  return <main><PageHero eyebrow={t("تواصل معنا", "Contact us")} title={t("أهلاً بكل سؤال وفكرة", "Every question and idea is welcome")} text={t("سواء كنت فرداً من العائلة، معلماً، شريكاً أو داعماً — يسعدنا أن نسمع منك.", "Whether you’re a family member, teacher, partner, or supporter—we’d love to hear from you.")} compact />
    <section className="page-section contact-layout"><form className="contact-form reveal" onSubmit={(event) => void submit(event)}><div><Eyebrow>{t("اكتب لنا", "Send a note")}</Eyebrow><h2>{t("كيف يمكننا مساعدتك؟", "How can we help?")}</h2>{unavailable && <p role="status">{t(`الخدمة غير متاحة مؤقتاً. راسلنا على ${config.contact.email}`, `Temporarily unavailable. Email us directly at ${config.contact.email}`)}</p>}</div><div className="form-two"><label>{t("الاسم", "Name")}<input name="name" required minLength={2} maxLength={80} placeholder={t("اسمك الكامل", "Your full name")} /></label><label>{t("البريد الإلكتروني", "Email")}<input name="email" required type="email" placeholder="name@example.com" /></label></div><label>{t("الموضوع", "Subject")}<input name="subject" maxLength={120} placeholder={t("اختر موضوعاً", "Choose a subject")} /></label><label>{t("الرسالة", "Message")}<textarea name="message" required minLength={10} maxLength={2000} placeholder={t("أخبرنا أكثر…", "Tell us a little more…")} /></label><label className="contact-honeypot" aria-hidden="true">Website<input name="honeypot" tabIndex={-1} autoComplete="off" /></label><Button type="submit" disabled={status === "loading"}>{status === "loading" ? <span className="button-braille-loader" aria-hidden="true"><i /><i /><i /></span> : <>{t("إرسال الرسالة", "Send message")}<Icon name="arrow" /></>}</Button>{status !== "idle" && <SubmitState status={status} errorKind={errorKind} retry={() => setStatus("idle")} />}<small>{t("بإرسال النموذج، أنت توافق على سياسة الخصوصية.", "By sending, you agree to our privacy policy.")}</small></form>
      <aside className="contact-aside reveal"><div className="contact-mascot"><Mascot mood="wave" /><p>{t("نرد عادةً خلال يوم عمل واحد.", "We usually reply within one working day.")}</p></div><a href={`mailto:${config.contact.email}`}><span><Icon name="email" /></span><div><small>{t("البريد", "Email")}</small><b>{config.contact.email}</b></div></a><a href="tel:23942834234"><span><Icon name="phone" /></span><div><small>{t("الهاتف", "Phone")}</small><b>23942834234</b></div></a><div className="aside-socials">{(["linkedin", "instagram", "github"] as IconName[]).map(x => <a href="#" key={x} aria-label={x}><Icon name={x} /></a>)}</div></aside></section>
    <section className="page-section faq"><div className="section-head"><Eyebrow>{t("أسئلة متكررة", "Frequently asked")}</Eyebrow><h2>{t("ربما تجد الإجابة هنا", "You may find the answer here")}</h2></div>{[[t("هل يمكنني تجربة قبس مجاناً؟", "Can I try QABAS for free?"), t("نعم، نوفر تجربة أولية للأفراد والمدارس. تواصل معنا لنرتبها.", "Yes. We offer pilot access for individuals and schools—contact us to arrange it.")], [t("هل يعمل قبس على الهاتف؟", "Does QABAS work on mobile?"), t("نعم، التجربة مصممة للهاتف واللوحي والحاسوب.", "Yes, it is designed for mobile, tablet, and desktop.")], [t("كيف تحمون بيانات المستخدمين؟", "How do you protect user data?"), t("نقلل جمع البيانات ونحمي المحتوى المترجم وفق أفضل الممارسات.", "We minimize data collection and protect translated content using established best practices.")]].map(([q, a], i) => <article className={open === i ? "open" : ""} key={q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><b>{q}</b><Icon name="chevron" /></button>{open === i && <p>{a}</p>}</article>)}</section>
  </main>;
}

function SubmitState({ status, errorKind, retry }: { status: "loading" | "success" | "error"; errorKind?: string; retry: () => void }) {
  const { t } = useSite();
  return <div className={`submit-state ${status}`} role="status" aria-live="polite">
    <Mascot mood={status === "loading" ? "thinking" : status} />
    <div><b>{status === "loading" ? t("جاري الإرسال…", "Sending…") : status === "success" ? t("وصلتنا رسالتك! هنرد عليك قريب", "Message received! We'll reply soon.") : errorKind === "config" ? t(`الخدمة غير متاحة مؤقتاً. راسلنا على ${"qabas.ai.team@gmail.com"}`, `Temporarily unavailable. Email us at ${"qabas.ai.team@gmail.com"}`) : t("حصلت مشكلة، جرب تاني", "Something went wrong, try again")}</b>
    {status === "error" && <button type="button" onClick={retry}>{t("حاول مرة أخرى", "Retry")}</button>}</div>
  </div>;
}

function BrailleDigit({ digit }: { digit: "4" }) {
  const cells = [1,0,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1];
  return <span className="braille-digit" aria-hidden="true">{cells.map((on, i) => <i className={on ? "" : "missing"} style={{ "--dot-index": i } as CSSProperties} key={`${digit}-${i}`} />)}</span>;
}

function Skeleton({ type }: { type: "team" | "stat" | "text" }) {
  return <div className={`q-skeleton ${type}`} aria-hidden="true"><Braille />{type === "team" && <><i className="sk-photo" /><i className="sk-line wide" /><i className="sk-line short" /></>}{type === "stat" && <><i className="sk-number" /><i className="sk-line short" /></>}{type === "text" && <>{[1,2,3,4].map(i => <i className={`sk-line ${i === 4 ? "short" : "wide"}`} key={i} />)}</>}</div>;
}

export function LoadingLab() {
  const { t } = useSite();
  const [demo, setDemo] = useState<"loading" | "success" | "error">("loading");
  return <main className="loading-lab">
    <section className="page-section"><div className="section-head"><Eyebrow>{t("حالات التحميل", "Loading system")}</Eyebrow><h1>{t("انتظارٌ لطيف وواضح", "Waiting, made friendly")}</h1><p>{t("مكوّنات خفيفة تبقي المستخدم على علم بما يحدث دون تشتيت.", "Lightweight components that keep people informed without distraction.")}</p></div>
      <div className="loader-showcase">
        <article><h2>{t("تحميل الزر", "Button loading")}</h2><button className="m-btn" aria-label={t("جاري التحميل", "Loading")}><span className="button-braille-loader"><i /><i /><i /></span></button></article>
        <article className="skeleton-showcase"><h2>{t("هياكل البطاقات", "Card skeletons")}</h2><div><Skeleton type="team" /><Skeleton type="stat" /><Skeleton type="text" /></div></article>
        <article className="submit-showcase"><h2>{t("إرسال النموذج", "Form submission")}</h2><div className="state-switcher">{(["loading","success","error"] as const).map(x => <button className={demo === x ? "active" : ""} onClick={() => setDemo(x)} key={x}>{x}</button>)}</div><SubmitState status={demo} retry={() => setDemo("loading")} /></article>
      </div>
    </section>
  </main>;
}

export function NotFound() {
  const { t } = useSite();
  const quick = [["about","من نحن","About"],["solution","الحل","Solution"],["team","الفريق","Team"],["contact","تواصل","Contact"]];
  return <main className="not-found">
    <div className="lost-pattern" aria-hidden="true" />
    <section aria-labelledby="not-found-title">
      <div className="braille-404" aria-hidden="true"><BrailleDigit digit="4" /><Mascot mood="lost" /><BrailleDigit digit="4" /></div>
      <div className="not-found-copy"><Eyebrow>{t("نقطة في غير مكانها", "A dot out of place")}</Eyebrow><h1 id="not-found-title">{t("ضللنا الطريق!", "We lost the way!")}</h1><p>{t("الصفحة اللي بتدور عليها مش موجودة أو اتنقلت. تعالى نرجعك للبداية.", "The page you're looking for doesn't exist or has moved. Let's get you back.")}</p><div className="not-found-actions"><Button to="/">{t("الرئيسية", "Go home")}<Icon name="arrow" /></Button><Button to="/contact" secondary>{t("تواصل معنا", "Contact us")}</Button></div></div>
      <nav className="quick-links" aria-label={t("روابط سريعة", "Quick links")}>{quick.map(([path,ar,en]) => <Link to={`/${path}`} key={path}><Braille />{t(ar,en)}</Link>)}</nav>
    </section>
  </main>;
}
