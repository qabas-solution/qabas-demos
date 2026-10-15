import { readFileSync } from "node:fs"

const report = readFileSync(new URL("./studio-controls.md", import.meta.url), "utf8")
const rows = report.split("\n").filter((line) => line.startsWith("| ") && !line.startsWith("|---"))
if (rows.length < 10) throw new Error("Studio control audit is incomplete")
for (const status of ["WORKING", "FIXED", "PARTIAL"]) {
  if (!report.includes(`| ${status} |`)) throw new Error(`Missing ${status} audit status`)
}
console.log(`Verified ${rows.length - 1} studio controls.`)
