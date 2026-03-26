"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabSectionLayout } from "@/components/tab-section-layout"
import { MessageSquare, Send } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const throughputData = [
  { month: "Jan", actual: 1.32, capacity: 2.0 },
  { month: "Feb", actual: 1.40, capacity: 2.0 },
  { month: "Mar", actual: 1.24, capacity: 2.0 },
  { month: "Apr", actual: 1.52, capacity: 2.1 },
  { month: "May", actual: 1.48, capacity: 2.1 },
  { month: "Jun", actual: 1.56, capacity: 2.1 },
  { month: "Jul", actual: 1.62, capacity: 2.2 },
  { month: "Aug", actual: 1.54, capacity: 2.2 },
  { month: "Sep", actual: 1.60, capacity: 2.2 },
  { month: "Oct", actual: 1.68, capacity: 2.2 },
  { month: "Nov", actual: 1.64, capacity: 2.2 },
  { month: "Dec", actual: 1.72, capacity: 2.2 },
]

const equipmentUtilization = [
  { line: "CNC Mill", utilization: 91 },
  { line: "CNC Lathe", utilization: 86 },
  { line: "Welding Bay", utilization: 88 },
  { line: "Assembly Bench", utilization: 82 },
  { line: "Paint Booth", utilization: 74 },
  { line: "QA Station", utilization: 79 },
]

const downtimeBreakdown = [
  { month: "Q1", scheduled: 14, unplanned: 6, maintenance: 4 },
  { month: "Q2", scheduled: 12, unplanned: 4, maintenance: 5 },
  { month: "Q3", scheduled: 16, unplanned: 8, maintenance: 3 },
  { month: "Q4", scheduled: 10, unplanned: 3, maintenance: 5 },
]

const workforceAllocation = [
  {
    department: "CNC & Machining",
    headcount: 12,
    utilization: "90.4%",
    overtime: "5.2%",
    openRoles: 1,
  },
  {
    department: "Fabrication & Welding",
    headcount: 8,
    utilization: "84.8%",
    overtime: "7.6%",
    openRoles: 2,
  },
  {
    department: "Assembly & Finishing",
    headcount: 10,
    utilization: "87.1%",
    overtime: "3.4%",
    openRoles: 1,
  },
  {
    department: "QA & Shipping",
    headcount: 5,
    utilization: "82.6%",
    overtime: "2.1%",
    openRoles: 0,
  },
  {
    department: "Admin & Sales",
    headcount: 3,
    utilization: "—",
    overtime: "—",
    openRoles: 1,
  },
]

const aiExampleInsights = [
  {
    prompt: "Why did output drop in March?",
    response:
      "March output fell 11.4% due to a 3-day unplanned shutdown caused by a hydraulic failure on the CNC mill. Combined with a planned maintenance day for the welding bay, effective production days dropped to 18 vs. the typical 22.",
  },
  {
    prompt: "Forecast next quarter demand",
    response:
      "Based on the current order backlog and seasonal patterns, Q1 2026 demand is projected at 4,800–5,200 units, roughly an 8% increase over Q1 2025. Precision parts make up about 55% of the pipeline.",
  },
]

export function OperationsTab() {
  return (
    <TabSectionLayout title="Operations">
    <div className="grid grid-cols-3 gap-4">
      {/* Left 2/3 — Charts and Table */}
      <div className="col-span-2 flex flex-col gap-4">
        {/* Throughput Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-card-foreground">
              Throughput Trend
            </CardTitle>
            <p className="text-base text-muted-foreground">
              Actual vs. maximum capacity (K units)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughputData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2F3E4D"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 16,
                      fill: "#E2E8F0",
                    }}
                    axisLine={{ stroke: "#2F3E4D" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 16,
                      fill: "#E2E8F0",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A202C",
                      border: "1px solid #2F3E4D",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "16px", color: "#F1F5F9", paddingTop: "8px" }}
                  />
                  <Area
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="capacity"
                    name="Max Capacity"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.1}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                  <Area
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="actual"
                    name="Actual Output"
                    stroke="#00D9FF"
                    fill="#00D9FF"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Equipment + Downtime Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Equipment Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-card-foreground">
                Equipment Utilization
              </CardTitle>
              <p className="text-base text-muted-foreground">
                Current shift performance (%)
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={equipmentUtilization} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#2F3E4D"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{
                        fontSize: 16,
                        fill: "#E2E8F0",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="line"
                      width={150}
                      tick={{
                        fontSize: 18,
                        fill: "#E2E8F0",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A202C",
                        border: "1px solid #2F3E4D",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                    <Bar
                    isAnimationActive={false}
                      dataKey="utilization"
                      name="Utilization %"
                      fill="#00D9FF"
                      radius={[0, 3, 3, 0]}
                      barSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Downtime Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-card-foreground">
                Downtime Breakdown
              </CardTitle>
              <p className="text-base text-muted-foreground">
                Hours by category per quarter
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={downtimeBreakdown}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#2F3E4D"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 16,
                        fill: "#E2E8F0",
                      }}
                      axisLine={{ stroke: "#2F3E4D" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fontSize: 16,
                        fill: "#E2E8F0",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A202C",
                        border: "1px solid #2F3E4D",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "16px", color: "#F1F5F9", paddingTop: "8px" }}
                    />
                    <Bar
                    isAnimationActive={false}
                      dataKey="scheduled"
                      name="Scheduled"
                      stackId="a"
                      fill="#6366F1"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                    isAnimationActive={false}
                      dataKey="unplanned"
                      name="Unplanned"
                      stackId="a"
                      fill="#FF6B35"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                    isAnimationActive={false}
                      dataKey="maintenance"
                      name="Preventive Maint."
                      stackId="a"
                      fill="#FFD60A"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workforce Allocation Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-card-foreground">
              Workforce Allocation
            </CardTitle>
            <p className="text-base text-muted-foreground">
              Current staffing by department (38 total)
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2.5 text-left text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Department
                    </th>
                    <th className="px-4 py-2.5 text-right text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Headcount
                    </th>
                    <th className="px-4 py-2.5 text-right text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Utilization
                    </th>
                    <th className="px-4 py-2.5 text-right text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Overtime
                    </th>
                    <th className="px-4 py-2.5 text-right text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Open Roles
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workforceAllocation.map((row, i) => (
                    <tr
                      key={row.department}
                      className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
                    >
                      <td className="px-4 py-2.5 font-medium text-card-foreground">
                        {row.department}
                      </td>
                      <td className="px-4 py-2.5 text-right text-card-foreground font-mono text-sm">
                        {row.headcount}
                      </td>
                      <td className="px-4 py-2.5 text-right text-card-foreground font-mono text-sm">
                        {row.utilization}
                      </td>
                      <td className="px-4 py-2.5 text-right text-card-foreground font-mono text-sm">
                        {row.overtime}
                      </td>
                      <td className="px-4 py-2.5 text-right text-card-foreground font-mono text-sm">
                        {row.openRoles}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right 1/3 — AI Assistant Panel */}
      <div className="flex flex-col gap-4">
        <Card className="flex-1 border-accent/30 bg-accent/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-7 rounded-md bg-accent/15">
                <MessageSquare className="size-4 text-accent" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-card-foreground">
                  Ask Northstar AI
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Operational intelligence assistant
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Example prompts + responses */}
            {aiExampleInsights.map((insight, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-start gap-2 rounded-md bg-primary/5 border border-primary/10 p-3">
                  <div className="shrink-0 mt-0.5 size-5 rounded-full bg-chart-1 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-primary-foreground">
                      JM
                    </span>
                  </div>
                  <p className="text-sm font-medium text-card-foreground italic">
                    {`"${insight.prompt}"`}
                  </p>
                </div>
                <div className="rounded-md bg-card border border-border p-3">
                  <p className="text-sm leading-relaxed text-card-foreground">
                    {insight.response}
                  </p>
                </div>
              </div>
            ))}

            {/* Input mockup */}
            <div className="mt-auto rounded-md border border-border bg-card p-2.5 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about operations data..."
                className="flex-1 bg-transparent text-sm text-card-foreground placeholder:text-muted-foreground outline-none"
                readOnly
              />
              <button className="flex items-center justify-center size-7 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                <Send className="size-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                "Overtime trends",
                "Predict downtime",
                "Cost optimization",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </TabSectionLayout>
  )
}
