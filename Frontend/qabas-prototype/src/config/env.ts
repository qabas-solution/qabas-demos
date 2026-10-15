import { z } from "zod"

const envSchema = z.object({
  VITE_EMAILJS_SERVICE_ID: z.string().trim().min(1).optional(),
  VITE_EMAILJS_TEMPLATE_ID: z.string().trim().min(1).optional(),
  VITE_EMAILJS_PUBLIC_KEY: z.string().trim().min(1).optional(),
})

const parsed = envSchema.safeParse(import.meta.env)

export const emailConfig = parsed.success
  ? {
      serviceId: parsed.data.VITE_EMAILJS_SERVICE_ID,
      templateId: parsed.data.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: parsed.data.VITE_EMAILJS_PUBLIC_KEY,
    }
  : { serviceId: undefined, templateId: undefined, publicKey: undefined }

export function hasEmailConfig() {
  return Boolean(
    emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey,
  )
}
