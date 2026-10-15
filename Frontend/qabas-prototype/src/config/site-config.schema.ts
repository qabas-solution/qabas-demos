import { z } from "zod"

const bilingual = z.object({ ar: z.string(), en: z.string() })
const toggle = z.object({
  id: z.string(),
  visible: z.boolean(),
  order: z.number(),
})

export const sceneIds = [
  "translator-card",
  "touch-blob",
  "flame-guardian",
  "dot-constellation",
  "lantern-path",
] as const

export const siteConfigSchema = z.object({
  version: z.literal(2),
  heroScene: z.enum(sceneIds),
  heroCopyVariant: z.enum(["home", "system"]),
  hero: z.object({ showStats: z.boolean(), showTrust: z.boolean() }),
  theme: z.object({
    mode: z.enum(["light", "dark", "system"]),
    shape: z.enum(["soft", "rounded", "pill"]),
    brand: z.string(),
    accent: z.string(),
    neutral: z.string(),
    solidStyle: z.enum(["color", "inverse"]),
    solidEffect: z.enum(["flat", "plastic"]),
    surface: z.enum(["filled", "translucent"]),
    scaling: z.enum(["90", "95", "100", "105", "110"]),
    transition: z.enum(["all", "micro", "macro"]),
  }),
  effects: z.object({
    backgroundPosition: z.enum(["fixed", "scroll"]),
    cursorMask: z.boolean(),
    dots: z.object({ on: z.boolean(), opacity: z.number().min(0).max(1) }),
    grid: z.boolean(),
    lines: z.boolean(),
    gradient: z.boolean(),
    particles: z.boolean(),
    splashCursor: z.boolean(),
  }),
  defaults: z.object({ language: z.enum(["ar", "en"]), lite: z.boolean() }),
  navbar: z.object({
    items: z.array(toggle.extend({ labels: bilingual, cta: z.boolean() })),
  }),
  pages: z.record(
    z.object({
      enabled: z.boolean(),
      sections: z.array(toggle),
    }),
  ),
  footer: z.object({
    columns: z.boolean(),
    social: z.boolean(),
    map: z.boolean(),
    newsletter: z.boolean(),
  }),
  contact: z.object({ email: z.string().email() }),
  contentOverrides: z.record(bilingual),
  dataOverrides: z.record(z.array(toggle)),
})

export type SiteConfig = z.infer<typeof siteConfigSchema>
export type HeroSceneId = SiteConfig["heroScene"]
