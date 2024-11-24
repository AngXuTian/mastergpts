"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", fraudAttempts: 123, preventedLoss: 450000 },
  { name: "Feb", fraudAttempts: 167, preventedLoss: 620000 },
  { name: "Mar", fraudAttempts: 145, preventedLoss: 540000 },
  { name: "Apr", fraudAttempts: 189, preventedLoss: 780000 },
  { name: "May", fraudAttempts: 176, preventedLoss: 690000 },
  { name: "Jun", fraudAttempts: 152, preventedLoss: 590000 },
]

export function CardFraudOverview() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Card Fraud Overview</CardTitle>
        <CardDescription>Monthly fraud attempts and prevented losses</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `RM${value / 1000}k`}
            />
            <Tooltip />
            <Bar yAxisId="left" dataKey="fraudAttempts" fill="#8884d8" radius={[4, 4, 0, 0]} name="Fraud Attempts" />
            <Bar yAxisId="right" dataKey="preventedLoss" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Prevented Loss (RM)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

