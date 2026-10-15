import { lazy, Suspense, useEffect, type ReactNode } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import i18n, { isLocale } from "@/i18n/config";
import { Footer, Navbar, Onboarding, PageTransition } from "@/components/layout";

const pageModules = {
  home: lazy(() => import("@/pages/home")),
  about: lazy(() => import("@/pages/about")),
  challenge: lazy(() => import("@/pages/challenge")),
  solution: lazy(() => import("@/pages/solution")),
  impact: lazy(() => import("@/pages/impact")),
  awards: lazy(() => import("@/pages/awards")),
  team: lazy(() => import("@/pages/team")),
  contact: lazy(() => import("@/pages/contact")),
  notFound: lazy(() => import("@/pages/not-found")),
} as const;

const HomePage = pageModules.home;
const AboutPage = pageModules.about;
const ChallengePage = pageModules.challenge;
const SolutionPage = pageModules.solution;
const ImpactPage = pageModules.impact;
const AwardsPage = pageModules.awards;
const TeamPage = pageModules.team;
const ContactPage = pageModules.contact;
const NotFoundPage = pageModules.notFound;

function PageSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-bg" aria-busy="true" />}>{children}</Suspense>;
}

function LocaleLayout() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();

  useEffect(() => {
    if (!isLocale(lang)) {
      return;
    }
    void i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  if (!isLocale(lang)) {
    return <Navigate to={`/ar${location.pathname}`} replace />;
  }

  return (
    <>
      <a className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-3" href="#main-content">Skip to content</a>
      <Navbar />
      <PageTransition><div id="main-content"><Outlet /></div></PageTransition>
      <Footer />
      <Onboarding />
    </>
  );
}

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/ar" replace /> },
  {
    path: "/:lang",
    element: <LocaleLayout />,
    children: [
      { index: true, element: <PageSuspense><HomePage /></PageSuspense> },
      { path: "about", element: <PageSuspense><AboutPage /></PageSuspense> },
      { path: "challenge", element: <PageSuspense><ChallengePage /></PageSuspense> },
      { path: "solution", element: <PageSuspense><SolutionPage /></PageSuspense> },
      { path: "impact", element: <PageSuspense><ImpactPage /></PageSuspense> },
      { path: "awards", element: <PageSuspense><AwardsPage /></PageSuspense> },
      { path: "team", element: <PageSuspense><TeamPage /></PageSuspense> },
      { path: "contact", element: <PageSuspense><ContactPage /></PageSuspense> },
      { path: "*", element: <PageSuspense><NotFoundPage /></PageSuspense> },
    ],
  },
]);
