"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, DollarSign, Clock, MapPin, ShoppingBag } from 'lucide-react'

interface Transaction {
  id: number
  trans_date_trans_time: string
  cc_num: number
  merchant: string
  category: string
  amt: number
  first: string
  last: string
  gender: string
  street: string
  city: string
  state: string
  zip: number
  lat: number
  long: number
  city_pop: number
  job: string
  dob: string
  trans_num: string
  unix_time: number
  merch_lat: number
  merch_long: number
}

function calculateFraudScore(transaction: Transaction): number {
  let score = 0

  // Check for high-value transactions
  if (transaction.amt > 1000) score += 20

  // Check for transactions at odd hours (between 1 AM and 5 AM)
  const hour = new Date(transaction.trans_date_trans_time).getHours()
  if (hour >= 1 && hour <= 5) score += 15

  // Check for transactions far from the user's location
  const distance = calculateDistance(
    transaction.lat,
    transaction.long,
    transaction.merch_lat,
    transaction.merch_long
  )
  if (distance > 100) score += 25 // Assuming distance is in km

  // Check for unusual merchant category
  const unusualCategories = ['Jewelry', 'Electronics', 'Travel']
  if (unusualCategories.includes(transaction.category)) score += 10

  // Check for transactions in high-fraud cities (this list should be updated based on real data)
  const highFraudCities = ['Las Vegas', 'Miami', 'New York']
  if (highFraudCities.includes(transaction.city)) score += 15

  // Normalize score to be between 0 and 100
  return Math.min(score, 100)
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

export function FraudDetectionAnalysis({ transaction }: { transaction: Transaction }) {
  const [fraudScore, setFraudScore] = useState(() => calculateFraudScore(transaction))

  const getFraudLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'bg-green-500' }
    if (score < 70) return { level: 'Medium', color: 'bg-yellow-500' }
    return { level: 'High', color: 'bg-red-500' }
  }

  const { level, color } = getFraudLevel(fraudScore)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span>Fraud Detection Analysis</span>
        </CardTitle>
        <CardDescription>Analysis of potential fraud indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Fraud Risk Score</span>
              <span className="text-sm font-medium">{fraudScore.toFixed(0)}%</span>
            </div>
            <Progress value={fraudScore} className={color} />
          </div>
          <div>
            <Badge variant={level === 'Low' ? 'default' : level === 'Medium' ? 'secondary' : 'destructive'}>
              {level} Risk
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Transaction Amount: ${transaction.amt.toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Transaction Time: {new Date(transaction.trans_date_trans_time).toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Transaction Location: {transaction.city}, {transaction.state}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Merchant Category: {transaction.category}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

