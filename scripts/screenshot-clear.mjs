import { chromium } from "playwright"
import { join } from "path"

const BASE_URL = process.env.BASE_URL || "http://localhost:3000"
const OUT_DIR = join(process.cwd(), "screenshots")

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
  } catch (_) {}
  await new Promise((r) => setTimeout(r, 1500))
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  console.log("Navigating to", BASE_URL)
  await page.goto(BASE_URL, { waitUntil: "networkidle" })
  await page.waitForSelector('[role="tablist"]', { timeout: 10000 })
  await waitForCharts(page)

  // Make sure we're on Executive Overview
  const trigger = page.getByRole("tab", { name: /Executive Overview/i })
  await trigger.click()
  await new Promise((r) => setTimeout(r, 2000))
  await waitForCharts(page)

  // Click "Run Model" and wait for results
  const runBtn = page.locator("button", { hasText: "Run Model" })
  if (await runBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    console.log("Clicking Run Model...")
    await runBtn.click()
    await page.waitForSelector("text=Complete", { timeout: 30000 })
    console.log("Model complete.")
    await new Promise((r) => setTimeout(r, 2000))
    await waitForCharts(page)
  }

  const path = join(OUT_DIR, "executive-overview-hd.png")
  await page.screenshot({
    path,
    fullPage: true,
    type: "png",
  })
  console.log("Saved:", path)

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
