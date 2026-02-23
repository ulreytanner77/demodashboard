"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabSectionLayout } from "@/components/tab-section-layout"
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

const industryDemand = [
  { month: "Jan", manufacturing: 102, automotive: 96, aerospace: 88 },
  { month: "Feb", manufacturing: 105, automotive: 98, aerospace: 90 },
  { month: "Mar", manufacturing: 100, automotive: 94, aerospace: 92 },
  { month: "Apr", manufacturing: 108, automotive: 101, aerospace: 95 },
  { month: "May", manufacturing: 112, automotive: 104, aerospace: 93 },
  { month: "Jun", manufacturing: 115, automotive: 107, aerospace: 97 },
  { month: "Jul", manufacturing: 118, automotive: 110, aerospace: 99 },
  { month: "Aug", manufacturing: 114, automotive: 106, aerospace: 96 },
  { month: "Sep", manufacturing: 120, automotive: 112, aerospace: 101 },
  { month: "Oct", manufacturing: 124, automotive: 115, aerospace: 104 },
  { month: "Nov", manufacturing: 122, automotive: 113, aerospace: 102 },
  { month: "Dec", manufacturing: 128, automotive: 118, aerospace: 106 },
]

const laborMarketData = [
  { metric: "CNC Machinists", supply: 82, demand: 94 },
  { metric: "Welders", supply: 75, demand: 92 },
  { metric: "Mech. Engineers", supply: 88, demand: 91 },
  { metric: "Technicians", supply: 90, demand: 86 },
  { metric: "QA Inspectors", supply: 85, demand: 80 },
]

const economicIndicators = [
  { quarter: "Q1 '24", pmi: 49.2, capacity: 77.1, orders: 48.8, confidence: 51.2 },
  { quarter: "Q2 '24", pmi: 50.1, capacity: 77.8, orders: 50.2, confidence: 52.8 },
  { quarter: "Q3 '24", pmi: 51.4, capacity: 78.4, orders: 52.1, confidence: 54.1 },
  { quarter: "Q4 '24", pmi: 52.8, capacity: 79.1, orders: 53.6, confidence: 55.4 },
  { quarter: "Q1 '25", pmi: 53.2, capacity: 79.8, orders: 54.2, confidence: 56.8 },
  { quarter: "Q2 '25", pmi: 54.1, capacity: 80.2, orders: 55.1, confidence: 57.2 },
  { quarter: "Q3 '25", pmi: 53.8, capacity: 80.6, orders: 54.8, confidence: 56.9 },
  { quarter: "Q4 '25", pmi: 55.2, capacity: 81.1, orders: 56.4, confidence: 58.1 },
]


export function MarketTab() {
  return (
    <TabSectionLayout title="Market & Public Data">
    <div className="flex flex-col gap-4">
      {/* Top row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Industry Demand Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-card-foreground">
              Industry Demand Index
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Indexed demand trends across key sectors (base = 100)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={industryDemand}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2F3E4D"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 11,
                      fill: "#B8BFCD",
                    }}
                    axisLine={{ stroke: "#2F3E4D" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "#B8BFCD",
                    }}
                    axisLine={false}
                    tickLine={false}
                    domain={[80, 135]}
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
                    type="monotone"
                    dataKey="manufacturing"
                    name="General Manufacturing"
                    stroke="#00D9FF"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="automotive"
                    name="Automotive"
                    stroke="#FF6B35"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="aerospace"
                    name="Aerospace & Defense"
                    stroke="#FFD60A"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Area Map */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-card-foreground">
              Service Area
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Customer concentration and revenue distribution
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 rounded-md bg-primary/5 border border-border overflow-hidden flex items-center justify-center">
              <svg
                viewBox="0 0 300 240"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Extended Reach - Outer zone */}
                <ellipse
                  cx="150"
                  cy="120"
                  rx="110"
                  ry="85"
                  fill="#4A5F6F"
                  opacity="0.08"
                  stroke="#4A5F6F"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                />
                {/* Regional Coverage - Middle zone */}
                <ellipse
                  cx="150"
                  cy="120"
                  rx="75"
                  ry="60"
                  fill="#00B4D8"
                  opacity="0.12"
                  stroke="#00B4D8"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                {/* Primary Market - Center zone */}
                <ellipse
                  cx="150"
                  cy="120"
                  rx="40"
                  ry="32"
                  fill="#00D9FF"
                  opacity="0.15"
                  stroke="#00D9FF"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />

                {/* Data point markers */}
                {/* Primary Market center */}
                <circle cx="150" cy="120" r="3.5" fill="#00D9FF" opacity="0.9" />
                <circle cx="150" cy="120" r="6" fill="#00D9FF" opacity="0.15" />

                {/* Regional coverage points */}
                <circle cx="135" cy="95" r="2.5" fill="#00B4D8" opacity="0.7" />
                <circle cx="165" cy="105" r="2.5" fill="#00B4D8" opacity="0.7" />
                <circle cx="148" cy="145" r="2.5" fill="#00B4D8" opacity="0.7" />
                <circle cx="175" cy="135" r="2" fill="#00B4D8" opacity="0.5" />

                {/* Extended reach points */}
                <circle cx="110" cy="80" r="1.5" fill="#4A5F6F" opacity="0.5" />
                <circle cx="195" cy="155" r="1.5" fill="#4A5F6F" opacity="0.5" />
                <circle cx="125" cy="175" r="1.5" fill="#4A5F6F" opacity="0.4" />
                <circle cx="220" cy="110" r="1.5" fill="#4A5F6F" opacity="0.4" />

                {/* Labels */}
                <text
                  x="150"
                  y="120"
                  textAnchor="middle"
                  dy="-8"
                  fontSize="12"
                  fontWeight="600"
                  fill="#00D9FF"
                  opacity="0.9"
                >
                  Primary Market
                </text>
                <text
                  x="150"
                  y="132"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#B8BFCD"
                  opacity="0.8"
                >
                  Core Revenue Hub
                </text>

                <text
                  x="150"
                  y="75"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#00B4D8"
                  opacity="0.8"
                >
                  Regional Coverage
                </text>

                <text
                  x="150"
                  y="195"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#4A5F6F"
                  opacity="0.6"
                >
                  Extended Reach
                </text>
              </svg>

              {/* Legend */}
              <div className="absolute bottom-3 left-3 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "#00D9FF",
                      opacity: 0.9,
                    }}
                  />
                  <span className="text-card-foreground">~60% revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "#00B4D8",
                      opacity: 0.7,
                    }}
                  />
                  <span className="text-muted-foreground">~30% revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: "#4A5F6F",
                      opacity: 0.5,
                    }}
                  />
                  <span className="text-muted-foreground">~10% revenue</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Labor Market */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-card-foreground">
              Labor Market Indicators
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Regional supply vs. demand index by skilled role
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={laborMarketData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2F3E4D"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="metric"
                    tick={{
                      fontSize: 10,
                      fill: "#B8BFCD",
                    }}
                    axisLine={{ stroke: "#2F3E4D" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[60, 100]}
                    tick={{
                      fontSize: 10,
                      fill: "#B8BFCD",
                    }}
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
                    dataKey="supply"
                    name="Labor Supply"
                    fill="#6366F1"
                    radius={[3, 3, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    isAnimationActive={false}
                    dataKey="demand"
                    name="Labor Demand"
                    fill="#FF6B35"
                    radius={[3, 3, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Economic Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-card-foreground">
              External Economic Indicators
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Key macroeconomic signals for manufacturing
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicIndicators}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#2F3E4D"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="quarter"
                    tick={{
                      fontSize: 10,
                      fill: "#B8BFCD",
                    }}
                    axisLine={{ stroke: "#2F3E4D" }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[45, 85]}
                    tick={{
                      fontSize: 10,
                      fill: "#B8BFCD",
                    }}
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
                    wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="pmi"
                    name="PMI Index"
                    stroke="#00D9FF"
                    strokeWidth={2}
                    dot={{ r: 2.5 }}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="capacity"
                    name="Capacity Utilization %"
                    stroke="#FF6B35"
                    strokeWidth={2}
                    dot={{ r: 2.5 }}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="orders"
                    name="New Orders Index"
                    stroke="#FFD60A"
                    strokeWidth={1.5}
                    dot={{ r: 2 }}
                    strokeDasharray="4 4"
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="confidence"
                    name="Business Confidence"
                    stroke="#10B981"
                    strokeWidth={1.5}
                    dot={{ r: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </TabSectionLayout>
  )
}
