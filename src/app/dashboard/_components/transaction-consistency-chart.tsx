import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TransactionConsistencyProps {
  transactions: Array<{
    transactionTime: number
    transactionAmountDeviation: number
  }>
}

export function TransactionConsistencyChart({ transactions }: TransactionConsistencyProps) {
  const data = transactions.map(t => ({
    time: t.transactionTime,
    amountDeviation: Math.abs(t.transactionAmountDeviation)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Consistency</CardTitle>
        <CardDescription>Time vs Amount Deviation</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="time" name="Time" unit="h" />
            <YAxis type="number" dataKey="amountDeviation" name="Amount Deviation" unit="$" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Transactions" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

