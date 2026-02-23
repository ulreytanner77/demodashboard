/**
 * Full-page screenshots of each dashboard tab.
 * Run with: npm run screenshot
 * Requires: dev server running at http://localhost:3000 (start with npm run dev)
 */

import { chromium } from "playwright"
import { mkdirSync, existsSync } from "fs"
import { join } from "path"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"
const OUT_DIR = join(process.cwd(), "screenshots")

const TABS = [
  { name: "Executive Overview", value: "executive", file: "executive-overview.png" },
  { name: "Operations", value: "operations", file: "operations.png" },
  { name: "Market & Public Data", value: "market", file: "market-public-data.png" },
]

/** Wait for Recharts to render (SVG with curves/bars) so chart visuals appear in screenshots. */
async function waitForCharts(page, timeoutMs = 15000) {
  try {
    await page.waitForSelector(".recharts-wrapper", { timeout: timeoutMs })
    await page.waitForFunction(
      () => {
        const curves = document.querySelectorAll(".recharts-line-curve, .recharts-area")
        const bars = document.querySelectorAll(".recharts-bar-rectangle")
        return curves.length + bars.length >= 1
      },
      { timeout: timeoutMs }
    )
  } catch (_) {
    // Charts may not be on this tab or structure differs; rely on delay
  }
  await new Promise((r) => setTimeout(r, 800))
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true })
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1400 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  try {
    console.log("Navigating to", BASE_URL)
    await page.goto(BASE_URL, { waitUntil: "networkidle" })
    await page.waitForSelector('[role="tablist"]', { timeout: 10000 })
    await waitForCharts(page)
  } catch (err) {
    console.error("Could not load the app. Is the dev server running? Start it with: npm run dev")
    console.error(err.message)
    await browser.close()
    process.exit(1)
  }

  for (const tab of TABS) {
    console.log("Capturing:", tab.name)
    const trigger = page.getByRole("tab", { name: new RegExp(tab.name, "i") })
    await trigger.click()
    await new Promise((r) => setTimeout(r, 2000))
    await waitForCharts(page)

    // If on Executive Overview, click "Run Model" and wait for results
    if (tab.value === "executive") {
      const runBtn = page.locator("button", { hasText: "Run Model" })
      if (await runBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log("  Running AI model...")
        await runBtn.click()
        // Wait for the "Complete" badge to appear (model finished)
        await page.waitForSelector("text=Complete", { timeout: 20000 })
        await new Promise((r) => setTimeout(r, 1000))
        await waitForCharts(page)
      }
    }

    const path = join(OUT_DIR, tab.file)
    await page.screenshot({
      path,
      fullPage: true,
    })
    console.log("  Saved:", path)
  }

  await browser.close()
  console.log("Done. Screenshots are in the 'screenshots' folder.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
