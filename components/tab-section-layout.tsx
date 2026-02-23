"use client"

import { Info, ChevronRight } from "lucide-react"

interface TabSectionLayoutProps {
  title: string
  children: React.ReactNode
}

export function TabSectionLayout({ title, children }: TabSectionLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Section header with blue underline */}
      <div className="space-y-0">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          {title}
        </h2>
        <div
          className="mt-1 h-0.5 w-full max-w-[calc(100%+1px)]"
          style={{ backgroundColor: "var(--color-chart-4)" }}
        />
      </div>

      {/* "What the Data Tells Us" panel */}
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg border border-border py-3 pl-0 pr-4 text-left transition-colors hover:bg-secondary/80"
        style={{
          background: "linear-gradient(to right, var(--secondary), var(--card))",
        }}
      >
        <div
          className="h-full min-h-[2.5rem] w-1 shrink-0 rounded-l-lg"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
        <div
          className="flex shrink-0 items-center justify-center rounded-full border-2 border-accent/50 bg-accent text-accent-foreground"
          style={{ width: 32, height: 32, minWidth: 32, minHeight: 32 }}
        >
          <Info style={{ width: 18, height: 18, minWidth: 18, minHeight: 18 }} strokeWidth={2.25} />
        </div>
        <span className="flex-1 text-sm font-medium text-accent">
          What the Data Tells Us
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
      </button>

      {/* Content (KPI cards, charts, etc.) */}
      {children}
    </div>
  )
}
