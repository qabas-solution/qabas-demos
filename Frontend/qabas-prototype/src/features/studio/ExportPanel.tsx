import { useRef, useState } from "react"
import { siteConfigService } from "@/config/site-config.service"
import type { SiteConfig } from "@/config/site-config.schema"
import { sendContactMessage } from "@/features/contact/send-contact-message"

export default function ExportPanel({
  config,
  label,
}: {
  config: SiteConfig
  label: (key: string) => string
}) {
  const input = useRef<HTMLInputElement>(null)
  const [testState, setTestState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const json = JSON.stringify(config, null, 2)
  const download = () => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(
      new Blob([json], { type: "application/json" }),
    )
    link.download = "qabas-site-config.json"
    link.click()
    URL.revokeObjectURL(link.href)
  }
  const importFile = async (file?: File) => {
    if (!file) return
    try {
      siteConfigService.import(JSON.parse(await file.text()))
    } catch {
      input.current?.setCustomValidity("Invalid JSON")
    }
    const sendTest = async () => {
      setTestState("loading")
      const result = await sendContactMessage(
        { name: "Qabas studio", email: config.contact.email, subject: "Studio test", message: "This is a contact form setup test.", honeypot: "" },
        { lang: "en", toEmail: config.contact.email },
      )
      setTestState(result.ok ? "success" : "error")
    }
  }
  return (
    <>
      <h2>{label("export")}</h2>
      <textarea readOnly value={json} aria-label="Configuration JSON" />
      <div className="studio-actions">
        <button
          type="button"
          onClick={() => void navigator.clipboard.writeText(json)}
        >
          {label("copyJson")}
        </button>
        <button
          type="button"
          onClick={() =>
            void navigator.clipboard.writeText(
              `import type { SiteConfig } from "./site-config.schema"\n\nconst defaultSiteConfig: SiteConfig = ${json}\n\nexport default defaultSiteConfig\n`,
            )
          }
        >
          Copy default config
        </button>
        <button type="button" onClick={download}>
          {label("download")}
        </button>
        <button type="button" onClick={() => input.current?.click()}>
          {label("import")}
        </button>
        <button type="button" onClick={() => void sendTest()} disabled={testState === "loading"}>
          {testState === "loading" ? "Sending…" : "Send test message"}
        </button>
        <input
          ref={input}
          hidden
          type="file"
          accept="application/json"
          onChange={(event) => void importFile(event.target.files?.[0])}
        />
      </div>
      {testState === "success" && <p role="status">Test message sent.</p>}
      {testState === "error" && <p role="status">Test message failed. Check the EmailJS setup.</p>}
    </>
  )
}
