import emailjs from "@emailjs/browser"
import { emailConfig, hasEmailConfig } from "@/config/env"
import type { ContactInput } from "./contact.schema"

export type ContactResult =
  | { ok: true }
  | { ok: false; kind: "network" | "rate_limit" | "config" | "unknown"; status?: number }

type SendOptions = {
  lang: "ar" | "en"
  toEmail: string
  pageUrl?: string
}

export async function sendContactMessage(
  input: ContactInput,
  options: SendOptions,
): Promise<ContactResult> {
  if (!hasEmailConfig()) {
    if (import.meta.env.DEV) console.error("Contact form is not configured")
    return { ok: false, kind: "config" }
  }
  const params = {
    from_name: input.name,
    reply_to: input.email,
    subject: input.subject ?? "",
    message: input.message,
    lang: options.lang,
    page_url: options.pageUrl ?? window.location.href,
    sent_at: new Date().toISOString(),
    to_email: options.toEmail,
  }
  try {
    await Promise.race([
      emailjs.send(emailConfig.serviceId!, emailConfig.templateId!, params, {
        publicKey: emailConfig.publicKey!,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 15000),
      ),
    ])
    return { ok: true }
  } catch (error) {
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? Number((error as { status?: number }).status)
        : undefined
    if (status === 429 || status === 412) return { ok: false, kind: "rate_limit", status }
    if (status === 400) return { ok: false, kind: "unknown", status }
    if (error instanceof Error && error.message === "timeout")
      return { ok: false, kind: "network" }
    return { ok: false, kind: "network", status }
  }
}
