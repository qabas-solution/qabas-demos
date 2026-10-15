import type { SiteConfig } from "./site-config.schema"

const labels = {
  about: ["من نحن", "About"],
  challenge: ["التحدّي", "Challenge"],
  solution: ["الحل", "Solution"],
  impact: ["الأثر", "Impact"],
  awards: ["الجوائز", "Awards"],
  team: ["الفريق", "Team"],
  contact: ["تواصل", "Contact"],
} as const

const sections = (ids: string[]) =>
  ids.map((id, order) => ({ id, visible: true, order }))

export const defaultSiteConfig: SiteConfig = {
  version: 2,
  heroScene: "translator-card",
  heroCopyVariant: "home",
  hero: { showStats: true, showTrust: true },
  theme: {
    mode: "light",
    shape: "rounded",
    brand: "indigo",
    accent: "amber",
    neutral: "ink",
    solidStyle: "color",
    solidEffect: "flat",
    surface: "filled",
    scaling: "100",
    transition: "all",
  },
  effects: {
    backgroundPosition: "fixed",
    cursorMask: false,
    dots: { on: false, opacity: 0.08 },
    grid: false,
    lines: false,
    gradient: false,
    particles: false,
    splashCursor: false,
  },
  defaults: { language: "ar", lite: false },
  navbar: {
    items: Object.entries(labels).map(([id, [ar, en]], order) => ({
      id,
      visible: true,
      order,
      labels: { ar, en },
      cta: false,
    })),
  },
  pages: {
    home: {
      enabled: true,
      sections: sections([
        "hero",
        "stats",
        "how",
        "stories",
        "quote",
        "closing",
      ]),
    },
    about: {
      enabled: true,
      sections: sections(["hero", "mission", "story", "values", "closing"]),
    },
    challenge: {
      enabled: true,
      sections: sections(["hero", "stats", "problems", "story", "closing"]),
    },
    solution: {
      enabled: true,
      sections: sections([
        "hero",
        "translator",
        "features",
        "comparison",
        "closing",
      ]),
    },
    impact: {
      enabled: true,
      sections: sections(["hero", "dashboard", "voices", "closing"]),
    },
    awards: {
      enabled: true,
      sections: sections(["hero", "awards", "closing"]),
    },
    team: { enabled: true, sections: sections(["hero", "team", "closing"]) },
    contact: { enabled: true, sections: sections(["hero", "form", "faq"]) },
  },
  footer: { columns: true, social: true, map: true, newsletter: true },
  contact: { email: "qabas.ai.team@gmail.com" },
  contentOverrides: {},
  dataOverrides: { team: [], awards: [], faq: [], timeline: [], stats: [] },
}

export default defaultSiteConfig
