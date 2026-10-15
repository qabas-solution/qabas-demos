import { describe, expect, it } from "vitest"
import { contactSchema } from "./contact.schema"

describe("contactSchema", () => {
  it("accepts trimmed valid messages", () => {
    const result = contactSchema.safeParse({
      name: "  Lama  ",
      email: "lama@example.com",
      subject: "",
      message: "A message with enough detail.",
      honeypot: "",
    })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.name).toBe("Lama")
  })

  it("rejects short names and messages", () => {
    expect(contactSchema.safeParse({ name: "A", email: "bad", message: "short" }).success).toBe(false)
  })
})
