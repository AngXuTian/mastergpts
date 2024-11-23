"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Week 1", CNP: 400, LostStolen: 240, Counterfeit: 180, AccountTakeover: 100 },
  { name: "Week 2", CNP: 300, LostStolen: 200, Counterfeit: 150, AccountTakeover: 80 },
  { name: "Week 3", CNP: 450, LostStolen: 280, Counterfeit: 190, AccountTakeover: 120 },
  { name: "Week 4", CNP: 500, LostStolen: 300, Counterfeit: 220, AccountTakeover: 150 },
  { name: "Week 5", CNP: 470, LostStolen: 270, Counterfeit: 200, AccountTakeover: 130 },
  { name: "Week 6", CNP: 420, LostStolen: 250, Counterfeit: 170, AccountTakeover: 110 },
]

export function CardFraudTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Fraud Trends</CardTitle>
        <CardDescription>Weekly trends of different card fraud types</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line type="monotone" dataKey="CNP" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="LostStolen" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="Counterfeit" stroke="#ffc658" strokeWidth={2} />
            <Line type="monotone" dataKey="AccountTakeover" stroke="#ff8042" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

