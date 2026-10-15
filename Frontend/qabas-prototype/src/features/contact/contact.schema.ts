import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  honeypot: z.string().max(0).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
