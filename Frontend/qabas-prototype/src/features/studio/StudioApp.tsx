import { useEffect, useState } from "react"
import { useSiteConfig } from "@/config/SiteConfigProvider"
import { siteConfigService } from "@/config/site-config.service"
import AppearancePanel from "./AppearancePanel"
import HeroPanel from "./HeroPanel"
import ExportPanel from "./ExportPanel"
import StudioGate from "./StudioGate"
import { studioMessages } from "./studio.messages"
import "./studio.scss"

type Tab = "appearance" | "hero" | "navigation" | "pages" | "content" | "footer" | "data" | "export"
const tabs: Tab[] = [
  "appearance",
  "hero",
  "navigation",
  "pages",
  "content",
  "footer",
  "data",
  "export",
]

export default function StudioApp() {
  const config = useSiteConfig()
  const [language, setLanguage] = useState<"ar" | "en">("en")
  const [tab, setTab] = useState<Tab>("appearance")
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  )
  const messages = studioMessages[language]
  const label = (key: string) => messages[(key as keyof typeof messages)] ?? key
  useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex,nofollow"
    document.head.append(meta)
    return () => meta.remove()
  }, [])
  return (
    <StudioGate>
      <main className="studio" dir={language === "ar" ? "rtl" : "ltr"}>
        <aside>
          <header>
            <h1>{messages.title}</h1>
            <button
              type="button"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            >
              {language === "ar" ? "EN" : "ع"}
            </button>
          </header>
          <nav aria-label={messages.title}>
            {tabs.map((item) => (
              <button
                type="button"
                className={tab === item ? "active" : ""}
                onClick={() => setTab(item)}
                key={item}
              >
                {label(item)}
              </button>
            ))}
          </nav>
          <div className="studio-panel">
            {siteConfigService.hadInvalidLocalOverride() && (
              <p role="status">An invalid saved configuration was cleared; defaults are active.</p>
            )}
            {tab === "appearance" && (
              <AppearancePanel config={config} label={label} />
            )}
            {tab === "hero" && <HeroPanel config={config} label={label} />}
            {tab === "export" && <ExportPanel config={config} label={label} />}
            {!["appearance", "hero", "export"].includes(tab) && (
              <ConfigList tab={tab} config={config} label={label} />
            )}
            <button
              className="studio-reset"
              type="button"
              onClick={() => siteConfigService.reset()}
            >
              {messages.reset}
            </button>
          </div>
        </aside>
        <section className={`studio-preview ${device}`}>
          <header>
            <b>{messages.preview}</b>
            <div>
              {(["mobile", "tablet", "desktop"] as const).map((item) => (
                <button
                  type="button"
                  className={device === item ? "active" : ""}
                  onClick={() => setDevice(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </header>
          <iframe title={messages.preview} src="/?studio-preview=1" />
        </section>
      </main>
    </StudioGate>
  )
}

function ConfigList({
  tab,
  config,
  label,
}: {
  tab: Tab
  config: ReturnType<typeof useSiteConfig>
  label: (key: string) => string
}) {
  const patch = (next: typeof config) => siteConfigService.set(next)
  if (tab === "footer") {
    return <section><h2>{label("footer")}</h2>{(["columns", "social", "map", "newsletter"] as const).map((key) => <ToggleRow key={key} label={key} value={config.footer[key]} onChange={(value) => patch({ ...config, footer: { ...config.footer, [key]: value } })} />)}</section>
  }
  if (tab === "navigation") {
    return <section><h2>{label("navigation")}</h2>{config.navbar.items.slice().sort((a, b) => a.order - b.order).map((item, index, items) => <div className="studio-toggle" key={item.id}><label><input type="checkbox" checked={item.visible} onChange={(event) => patch({ ...config, navbar: { items: config.navbar.items.map((value) => value.id === item.id ? { ...value, visible: event.target.checked } : value) } })} /> {item.labels.en}</label><button type="button" aria-label={`Move ${item.id} up`} disabled={index === 0} onClick={() => patch({ ...config, navbar: { items: config.navbar.items.map((value) => value.id === item.id ? { ...value, order: item.order - 1 } : value.id === items[index - 1].id ? { ...value, order: item.order } : value) } })}>↑</button><button type="button" aria-label={`Move ${item.id} down`} disabled={index === items.length - 1} onClick={() => patch({ ...config, navbar: { items: config.navbar.items.map((value) => value.id === item.id ? { ...value, order: item.order + 1 } : value.id === items[index + 1].id ? { ...value, order: item.order } : value) } })}>↓</button></div>)}</section>
  }
  if (tab === "pages") {
    return <section><h2>{label("pages")}</h2>{Object.entries(config.pages).map(([id, page]) => <div className="studio-group" key={id}><ToggleRow label={id} value={page.enabled} onChange={(enabled) => patch({ ...config, pages: { ...config.pages, [id]: { ...page, enabled } } })} />{page.sections.slice().sort((a, b) => a.order - b.order).map((section) => <div className="studio-toggle" key={section.id}><label><input type="checkbox" checked={section.visible} onChange={(event) => patch({ ...config, pages: { ...config.pages, [id]: { ...page, sections: page.sections.map((value) => value.id === section.id ? { ...value, visible: event.target.checked } : value) } } })} /> {section.id}</label><input aria-label={`${id} ${section.id} order`} type="number" value={section.order} onChange={(event) => patch({ ...config, pages: { ...config.pages, [id]: { ...page, sections: page.sections.map((value) => value.id === section.id ? { ...value, order: Number(event.target.value) } : value) } } })} /></div>)}</div>)}</section>
  }
  if (tab === "content") {
    return <section><h2>{label("content")}</h2>{Object.entries(config.contentOverrides).map(([key, value]) => <div className="studio-group" key={key}><label>{key}<textarea value={value.en} onChange={(event) => patch({ ...config, contentOverrides: { ...config.contentOverrides, [key]: { ...value, en: event.target.value } } })} /></label></div>)}<p>{Object.keys(config.contentOverrides).length === 0 ? "No content overrides yet. Import a validated config to add one." : ""}</p></section>
  }
  if (tab === "data") {
    return <section><h2>{label("data")}</h2>{Object.entries(config.dataOverrides).map(([key, items]) => <div className="studio-group" key={key}><h3>{key}</h3>{items.map((item, index) => <div className="studio-toggle" key={item.id}><label><input type="checkbox" checked={item.visible} onChange={(event) => patch({ ...config, dataOverrides: { ...config.dataOverrides, [key]: items.map((value) => value.id === item.id ? { ...value, visible: event.target.checked } : value) } })} /> {item.id}</label><input aria-label={`${key} ${item.id} order`} type="number" value={item.order} onChange={(event) => patch({ ...config, dataOverrides: { ...config.dataOverrides, [key]: items.map((value) => value.id === item.id ? { ...value, order: Number(event.target.value) } : value) } })} /></div>)}{items.length === 0 && <p>No override items.</p>}</div>)}</section>
  }
  return null
}
