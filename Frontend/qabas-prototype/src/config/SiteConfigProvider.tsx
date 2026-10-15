import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { siteConfigService } from "./site-config.service"
import type { SiteConfig } from "./site-config.schema"

const SiteConfigContext = createContext<SiteConfig | null>(null)

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const config = useSyncExternalStore(
    siteConfigService.subscribe,
    siteConfigService.getSnapshot,
    siteConfigService.getSnapshot,
  )

  useEffect(() => {
    void siteConfigService.load()
  }, [])
  useEffect(() => {
    const root = document.documentElement
    root.dataset.shape = config.theme.shape
    root.dataset.scale = config.theme.scaling
    root.dataset.surface = config.theme.surface
    root.dataset.solid = config.theme.solidStyle
    root.dataset.effect = config.theme.solidEffect
    root.dataset.transition = config.theme.transition
    root.dataset.mode = config.theme.mode
    root.dataset.brand = config.theme.brand
    root.dataset.accent = config.theme.accent
    root.dataset.neutral = config.theme.neutral
  }, [config])

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  const value = useContext(SiteConfigContext)
  if (!value)
    throw new Error("useSiteConfig must be used inside SiteConfigProvider")
  return value
}

export function useSiteConfigSelector<T>(selector: (config: SiteConfig) => T): T {
  return selector(useSiteConfig())
}
