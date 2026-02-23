import { Calendar, Download, Bell } from "lucide-react"
import { NorthstarLogo } from "@/components/northstar-logo"

export function DashboardHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center size-9 rounded-md"
              style={{
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent) 60%, rgba(99, 102, 241, 0.35) 100%)",
              }}
            >
              <NorthstarLogo className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-primary-foreground">
                Northstar Manufacturing Group
              </h1>
              <p className="text-xs text-primary-foreground/60">
                Business Intelligence Platform
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md bg-primary-foreground/10 px-3 py-1.5 text-sm text-primary-foreground/80">
            <Calendar className="size-3.5" />
            <span>Jan 2025 — Dec 2025</span>
          </div>
          <button className="flex items-center gap-1.5 rounded-md bg-primary-foreground/10 px-3 py-1.5 text-sm text-primary-foreground/80 hover:bg-primary-foreground/15 transition-colors">
            <Download className="size-3.5" />
            <span>Export</span>
          </button>
          <button className="relative flex items-center justify-center size-8 rounded-md bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/15 transition-colors">
            <Bell className="size-4" />
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-accent" />
          </button>
          <div className="ml-2 flex items-center gap-2">
            <div className="size-8 rounded-full bg-chart-1 flex items-center justify-center text-xs font-semibold text-primary-foreground">
              JM
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
