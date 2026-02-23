"use client"

import { useState, useEffect, useRef } from "react"
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Play,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabSectionLayout } from "@/components/tab-section-layout"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const kpis = [
  {
    title: "Revenue (YTD)",
    value: "$5.84M",
    change: "+14.2%",
    trend: "up" as const,
    description: "vs. $5.11M prior year",
  },
  {
    title: "Output Volume",
    value: "18,240",
    change: "+9.3%",
    trend: "up" as const,
    description: "units produced YTD",
  },
  {
    title: "On-Time Delivery",
    value: "93.8%",
    change: "-1.6%",
    trend: "down" as const,
    description: "target: 95.0%",
  },
  {
    title: "Cost per Unit",
    value: "$42.10",
    change: "-2.8%",
    trend: "up" as const,
    description: "down from $43.31",
  },
  {
    title: "Team Utilization",
    value: "86.4%",
    change: "+3.1%",
    trend: "up" as const,
    description: "38 employees",
  },
]

const monthlyTrend = [
  { month: "Jan", production: 1.32, revenue: 420 },
  { month: "Feb", production: 1.40, revenue: 445 },
  { month: "Mar", production: 1.24, revenue: 388 },
  { month: "Apr", production: 1.52, revenue: 482 },
  { month: "May", production: 1.48, revenue: 470 },
  { month: "Jun", production: 1.56, revenue: 498 },
  { month: "Jul", production: 1.62, revenue: 518 },
  { month: "Aug", production: 1.54, revenue: 492 },
  { month: "Sep", production: 1.60, revenue: 510 },
  { month: "Oct", production: 1.68, revenue: 536 },
  { month: "Nov", production: 1.64, revenue: 524 },
  { month: "Dec", production: 1.72, revenue: 556 },
]

const segmentPerformance = [
  { segment: "Precision Parts", revenue: 2.18, target: 2.0 },
  { segment: "Custom Fabrication", revenue: 1.62, target: 1.75 },
  { segment: "Assembly Services", revenue: 1.24, target: 1.10 },
  { segment: "Maintenance & Repair", revenue: 0.80, target: 0.70 },
]

const modelConfigs: Record<string, {
  name: string
  description: string
  metrics: { r2: number; mape: number; confidence: number; horizon: string }
  insights: string[]
  data: { period: string; actual: number | null; predicted: number }[]
  yAxisLabel: string
}> = {
  revenue: {
    name: "Revenue Forecast",
    description: "6-month revenue projection using time-series analysis",
    metrics: { r2: 0.94, mape: 3.2, confidence: 92, horizon: "6 months" },
    insights: [
      "Revenue projected to reach $920K/mo by Jun 2026, +65% over current run rate",
      "Seasonal dip expected in Mar 2026 — recommend pre-booking Q1 orders",
      "Precision Parts segment driving 58% of forecasted growth",
    ],
    data: [
      { period: "Jul", actual: 518, predicted: 510 },
      { period: "Aug", actual: 492, predicted: 540 },
      { period: "Sep", actual: 510, predicted: 575 },
      { period: "Oct", actual: 536, predicted: 615 },
      { period: "Nov", actual: 524, predicted: 660 },
      { period: "Dec", actual: 556, predicted: 720 },
      { period: "Jan '26", actual: null, predicted: 840 },
      { period: "Feb '26", actual: null, predicted: 960 },
      { period: "Mar '26", actual: null, predicted: 910 },
      { period: "Apr '26", actual: null, predicted: 1080 },
      { period: "May '26", actual: null, predicted: 1220 },
      { period: "Jun '26", actual: null, predicted: 1380 },
    ],
    yAxisLabel: "Revenue ($K)",
  },
  production: {
    name: "Production Optimization",
    description: "Optimize output targets using constraint-based modeling",
    metrics: { r2: 0.91, mape: 4.1, confidence: 89, horizon: "6 months" },
    insights: [
      "Optimal production target: 2,400 units/mo — current output is 18% below potential",
      "Equipment downtime on Line B reducing capacity by ~120 units/mo",
      "Shift rebalancing could increase throughput by 6.2% without added headcount",
    ],
    data: [
      { period: "Jul", actual: 1.62, predicted: 1.58 },
      { period: "Aug", actual: 1.54, predicted: 1.68 },
      { period: "Sep", actual: 1.60, predicted: 1.82 },
      { period: "Oct", actual: 1.68, predicted: 1.96 },
      { period: "Nov", actual: 1.64, predicted: 2.08 },
      { period: "Dec", actual: 1.72, predicted: 2.22 },
      { period: "Jan '26", actual: null, predicted: 2.48 },
      { period: "Feb '26", actual: null, predicted: 2.76 },
      { period: "Mar '26", actual: null, predicted: 2.64 },
      { period: "Apr '26", actual: null, predicted: 3.04 },
      { period: "May '26", actual: null, predicted: 3.30 },
      { period: "Jun '26", actual: null, predicted: 3.56 },
    ],
    yAxisLabel: "Units (K)",
  },
  cost: {
    name: "Cost Prediction",
    description: "Predict per-unit cost trajectory with material price inputs",
    metrics: { r2: 0.89, mape: 2.8, confidence: 87, horizon: "6 months" },
    insights: [
      "Cost per unit projected to drop to $34.00 by Q2 2026, down 19% from current",
      "Raw material price increases in Q1 may temporarily raise costs by $0.80/unit",
      "Process automation investments showing 1.2% quarterly cost reduction trend",
    ],
    data: [
      { period: "Jul", actual: 43.2, predicted: 43.5 },
      { period: "Aug", actual: 42.8, predicted: 41.6 },
      { period: "Sep", actual: 42.5, predicted: 39.8 },
      { period: "Oct", actual: 42.3, predicted: 38.2 },
      { period: "Nov", actual: 42.1, predicted: 36.8 },
      { period: "Dec", actual: 42.1, predicted: 35.2 },
      { period: "Jan '26", actual: null, predicted: 32.8 },
      { period: "Feb '26", actual: null, predicted: 30.6 },
      { period: "Mar '26", actual: null, predicted: 31.4 },
      { period: "Apr '26", actual: null, predicted: 28.0 },
      { period: "May '26", actual: null, predicted: 25.5 },
      { period: "Jun '26", actual: null, predicted: 23.0 },
    ],
    yAxisLabel: "Cost ($)",
  },
  demand: {
    name: "Demand Forecast",
    description: "Predict order volume using market signals and pipeline data",
    metrics: { r2: 0.88, mape: 5.3, confidence: 85, horizon: "6 months" },
    insights: [
      "Order volume projected to surge 72% over next 6 months driven by automotive sector",
      "Q1 2026 shows potential demand spike — ensure 15% inventory buffer for key SKUs",
      "Three new accounts in pipeline could add $420K in annual recurring orders",
    ],
    data: [
      { period: "Jul", actual: 285, predicted: 278 },
      { period: "Aug", actual: 272, predicted: 305 },
      { period: "Sep", actual: 290, predicted: 340 },
      { period: "Oct", actual: 305, predicted: 380 },
      { period: "Nov", actual: 298, predicted: 420 },
      { period: "Dec", actual: 318, predicted: 465 },
      { period: "Jan '26", actual: null, predicted: 540 },
      { period: "Feb '26", actual: null, predicted: 620 },
      { period: "Mar '26", actual: null, predicted: 680 },
      { period: "Apr '26", actual: null, predicted: 745 },
      { period: "May '26", actual: null, predicted: 810 },
      { period: "Jun '26", actual: null, predicted: 875 },
    ],
    yAxisLabel: "Orders",
  },
}

export function ExecutiveOverview() {
  const [selectedModel, setSelectedModel] = useState("revenue")
  const [modelState, setModelState] = useState<"idle" | "running" | "complete">("idle")
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const runModel = () => {
    setModelState("running")
    setProgress(0)
    let p = 0
    intervalRef.current = setInterval(() => {
      p += Math.random() * 15 + 5
      if (p >= 100) {
        p = 100
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimeout(() => setModelState("complete"), 400)
      }
      setProgress(Math.min(Math.round(p), 100))
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleModelChange = (value: string) => {
    setSelectedModel(value)
    setModelState("idle")
    setProgress(0)
  }

  const config = modelConfigs[selectedModel]

  return (
    <TabSectionLayout title="Executive Overview">
      <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <Card
            key={kpi.title}
            className="py-6 gap-3 px-0 border-l-4"
            style={{
              borderLeftColor:
                index % 2 === 0 ? "#00D9FF" : "#6366F1",
            }}
          >
            <CardHeader className="pb-2 px-0">
              <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground text-center block">
                {kpi.title}
              </span>
            </CardHeader>
            <CardContent className="px-0 text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl font-bold text-card-foreground tracking-tight">
                  {kpi.value}
                </span>
                <span
                  className="flex items-center gap-0.5 text-xs font-semibold justify-center"
                  style={{
                    color:
                      kpi.trend === "up"
                        ? "var(--positive)"
                        : "var(--negative)",
                  }}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {kpi.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* 12-Month Trend Line */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-card-foreground">
              Production & Revenue Trend
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              12-month trailing performance
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2F3E4D"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#B8BFCD" }}
                    axisLine={{ stroke: "#2F3E4D" }}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 11, fill: "#B8BFCD" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Units (K)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 10, fill: "#B8BFCD" },
                    }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 11, fill: "#B8BFCD" }}
                    axisLine={false}
                    tickLine={false}
                    label={{
                      value: "Revenue ($K)",
                      angle: 90,
                      position: "insideRight",
                      style: { fontSize: 10, fill: "#B8BFCD" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A202C",
                      border: "1px solid #2F3E4D",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                  />
                  <Line
                    isAnimationActive={false}
                    yAxisId="left"
                    type="monotone"
                    dataKey="production"
                    name="Production (K units)"
                    stroke="#00D9FF"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#00D9FF" }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    isAnimationActive={false}
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue ($K)"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#6366F1" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Segment Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-card-foreground">
              Segment Performance
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Revenue vs. target ($M)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={segmentPerformance}
                  layout="vertical"
                  barGap={2}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2F3E4D"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#B8BFCD" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="segment"
                    width={110}
                    tick={{ fontSize: 11, fill: "#B8BFCD" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A202C",
                      border: "1px solid #2F3E4D",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                  />
                  <Bar
                    isAnimationActive={false}
                    dataKey="revenue"
                    name="Actual Revenue"
                    fill="#00D9FF"
                    radius={[0, 3, 3, 0]}
                    barSize={14}
                  />
                  <Bar
                    isAnimationActive={false}
                    dataKey="target"
                    name="Target"
                    fill="#6366F1"
                    radius={[0, 3, 3, 0]}
                    barSize={14}
                    opacity={0.5}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Data Modeling */}
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded-lg bg-accent/15">
              <Brain className="size-4 text-accent" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-sm font-semibold text-card-foreground">
                AI Data Modeling
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Run predictive models on your manufacturing data
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedModel} onValueChange={handleModelChange}>
                <SelectTrigger className="w-[200px] h-8 text-xs bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Forecast</SelectItem>
                  <SelectItem value="production">Production Optimization</SelectItem>
                  <SelectItem value="cost">Cost Prediction</SelectItem>
                  <SelectItem value="demand">Demand Forecast</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={runModel}
                disabled={modelState === "running"}
                className="flex items-center gap-1.5 px-4 h-8 rounded-md text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {modelState === "running" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Play className="size-3.5" />
                )}
                {modelState === "running" ? "Running..." : "Run Model"}
              </button>
              {modelState === "complete" && (
                <Badge variant="outline" className="gap-1 text-[10px] border-[var(--positive)]/30 text-[var(--positive)]">
                  <CheckCircle2 className="size-3" />
                  Complete
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Model description */}
          <p className="text-xs text-muted-foreground mb-4">
            {config.description}
          </p>

          {/* Running state */}
          {modelState === "running" && (
            <div className="rounded-md bg-card border border-border p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-accent" />
                  Running {config.name}...
                </div>
                <div className="w-full max-w-md">
                  <Progress value={progress} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Analyzing data points and generating predictions — {progress}%
                </p>
              </div>
            </div>
          )}

          {/* Idle state */}
          {modelState === "idle" && (
            <div className="rounded-md bg-card border border-border p-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex items-center justify-center size-12 rounded-full bg-accent/10">
                  <Brain className="size-6 text-accent/60" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Select a model and click <strong className="text-card-foreground">Run Model</strong> to generate predictions
                </p>
                <p className="text-xs text-muted-foreground max-w-md">
                  Models use historical manufacturing data to produce forecasts, identify optimization opportunities, and surface actionable insights.
                </p>
              </div>
            </div>
          )}

          {/* Complete state — results */}
          {modelState === "complete" && (
            <div className="grid grid-cols-3 gap-4">
              {/* Forecast Chart */}
              <div className="col-span-2 rounded-md bg-card border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold text-card-foreground">
                    Forecast: Actual vs. Predicted
                  </h4>
                  <span className="text-[10px] text-muted-foreground">
                    Dashed line = projected values
                  </span>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={config.data}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#2F3E4D"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="period"
                        tick={{ fontSize: 10, fill: "#B8BFCD" }}
                        axisLine={{ stroke: "#2F3E4D" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#B8BFCD" }}
                        axisLine={false}
                        tickLine={false}
                        label={{
                          value: config.yAxisLabel,
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 10, fill: "#B8BFCD" },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1A202C",
                          border: "1px solid #2F3E4D",
                          borderRadius: "6px",
                          fontSize: "11px",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
                      />
                      <Line
                    isAnimationActive={false}
                        type="monotone"
                        dataKey="actual"
                        name="Actual"
                        stroke="#00D9FF"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#00D9FF" }}
                        connectNulls={false}
                      />
                      <Line
                    isAnimationActive={false}
                        type="monotone"
                        dataKey="predicted"
                        name="Predicted"
                        stroke="#FFD60A"
                        strokeWidth={2}
                        strokeDasharray="6 3"
                        dot={{ r: 3, fill: "#FFD60A" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Model Metrics & Insights */}
              <div className="rounded-md bg-card border border-border p-4 flex flex-col gap-4">
                <h4 className="text-xs font-semibold text-card-foreground">
                  Model Output
                </h4>

                {/* Metrics */}
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground">Accuracy (R²)</span>
                      <span className="text-xs font-mono font-semibold text-card-foreground">{config.metrics.r2}</span>
                    </div>
                    <Progress value={config.metrics.r2 * 100} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground">Mean Error (MAPE)</span>
                      <span className="text-xs font-mono font-semibold text-card-foreground">{config.metrics.mape}%</span>
                    </div>
                    <Progress value={100 - config.metrics.mape * 5} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground">Confidence Level</span>
                      <span className="text-xs font-mono font-semibold text-card-foreground">{config.metrics.confidence}%</span>
                    </div>
                    <Progress value={config.metrics.confidence} className="h-1.5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Forecast Horizon</span>
                    <span className="text-xs font-mono font-semibold text-card-foreground">{config.metrics.horizon}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Key Findings */}
                <div>
                  <h5 className="text-[11px] font-semibold text-card-foreground mb-2">Key Findings</h5>
                  <ul className="flex flex-col gap-2">
                    {config.insights.map((insight, i) => (
                      <li key={i} className="text-[11px] leading-relaxed text-muted-foreground flex gap-2">
                        <span className="text-accent mt-0.5 shrink-0">&#8226;</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </TabSectionLayout>
  )
}
