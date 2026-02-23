"use client"

import Image from "next/image"
import { DashboardHeader } from "@/components/dashboard-header"
import { ExecutiveOverview } from "@/components/executive-overview"
import { OperationsTab } from "@/components/operations-tab"
import { MarketTab } from "@/components/market-tab"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  BarChart3,
  Settings2,
  Globe,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-8 py-6">
        <Tabs defaultValue="executive" className="gap-6">
          <div className="flex items-center justify-between">
            <TabsList className="h-10 bg-secondary">
              <TabsTrigger
                value="executive"
                className="gap-1.5 px-4 data-[state=active]:bg-card data-[state=active]:text-card-foreground"
              >
                <BarChart3 className="size-3.5" />
                Executive Overview
              </TabsTrigger>
              <TabsTrigger
                value="operations"
                className="gap-1.5 px-4 data-[state=active]:bg-card data-[state=active]:text-card-foreground"
              >
                <Settings2 className="size-3.5" />
                Operations
              </TabsTrigger>
              <TabsTrigger
                value="market"
                className="gap-1.5 px-4 data-[state=active]:bg-card data-[state=active]:text-card-foreground"
              >
                <Globe className="size-3.5" />
                {"Market & Public Data"}
              </TabsTrigger>
            </TabsList>
            <p className="text-[11px] text-muted-foreground">
              Last updated: Feb 16, 2026 at 09:14 AM EST
            </p>
          </div>

          <TabsContent value="executive">
            <ExecutiveOverview />
          </TabsContent>
          <TabsContent value="operations">
            <OperationsTab />
          </TabsContent>
          <TabsContent value="market">
            <MarketTab />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer: logo at 2x then scaled down so text in image renders sharper */}
      <footer className="px-8 py-4 flex items-center justify-center border-t border-border bg-card">
        <div className="h-14 w-[180px] overflow-hidden flex items-center justify-center">
          <div
            className="flex-shrink-0"
            style={{
              width: 360,
              height: 112,
              transform: "scale(0.5)",
              transformOrigin: "center",
            }}
          >
            <Image
              src="/logo-autom.png"
              alt="Powered by Autom"
              width={360}
              height={112}
              className="h-full w-full object-contain"
              style={{ imageRendering: "auto" }}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
