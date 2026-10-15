import defaultSiteConfig from "./default-site-config"
import { siteConfigSchema, type SiteConfig } from "./site-config.schema"

const storageKey = "qabas-site-config-v2"
const channelName = "qabas-site-config"
const listeners = new Set<() => void>()
let current = defaultSiteConfig
let invalidLocalOverride = false
let writeTimer: ReturnType<typeof setTimeout> | undefined
let pending: SiteConfig | undefined
const channel =
  typeof BroadcastChannel === "undefined"
    ? null
    : new BroadcastChannel(channelName)

function parse(value: unknown): SiteConfig | null {
  const result = siteConfigSchema.safeParse(value)
  return result.success ? result.data : null
}

function notify(config: SiteConfig) {
  current = config
  listeners.forEach((listener) => listener())
}

function persist(config: SiteConfig) {
  pending = config
  if (writeTimer) return
  writeTimer = setTimeout(() => {
    if (pending) {
      localStorage.setItem(storageKey, JSON.stringify(pending))
      channel?.postMessage(pending)
    }
    pending = undefined
    writeTimer = undefined
  }, 120)
}

export const siteConfigService = {
  getSnapshot: () => current,
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  set(config: SiteConfig) {
    notify(config)
    persist(config)
  },
  patch(patch: Partial<SiteConfig>) {
    this.set({ ...current, ...patch })
  },
  reset() {
    localStorage.removeItem(storageKey)
    notify(defaultSiteConfig)
    channel?.postMessage(defaultSiteConfig)
  },
  import(value: unknown) {
    const config = parse(value)
    if (!config) return false
    this.set(config)
    return true
  },
  async load() {
    let merged = defaultSiteConfig
    const remoteUrl = import.meta.env.VITE_CONFIG_URL
    if (remoteUrl) {
      try {
        const remote = parse(await (await fetch(remoteUrl)).json())
        if (remote) merged = remote
      } catch {
        // A remote configuration is optional; the validated default remains safe.
      }
    }
    try {
      const stored = localStorage.getItem(storageKey)
      const local = stored ? parse(JSON.parse(stored)) : null
      if (local) merged = local
      else if (stored) {
        invalidLocalOverride = true
        localStorage.removeItem(storageKey)
      }
    } catch {
      invalidLocalOverride = true
      localStorage.removeItem(storageKey)
    }
    notify(merged)
  },
  hadInvalidLocalOverride() {
    return invalidLocalOverride
  },
}

channel?.addEventListener("message", (event: MessageEvent<unknown>) => {
  const config = parse(event.data)
  if (config) notify(config)
})
