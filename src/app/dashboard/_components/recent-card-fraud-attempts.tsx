"use client"

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, DollarSign, Clock, MapPin, ShoppingBag } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

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
  is_fraud: boolean
  fraudScore: number
}

// function deg2rad(deg: number): number {
//   return deg * (Math.PI / 180)
// }

function FraudDetectionAnalysis({ transaction }: { transaction: Transaction }) {
  const fraudScore = transaction.fraudScore

  const getFraudLevel = (score: number) => {
    if (score < 30) return { level: 'Low', color: 'bg-green-500' }
    if (score < 70) return { level: 'Medium', color: 'bg-yellow-500' }
    return { level: 'High', color: 'bg-red-500' }
  }

  const { level, color } = getFraudLevel(fraudScore)

  return (
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
  )
}

const recentAttempts: Transaction[] = [
  {
    id: 1,
    trans_date_trans_time: "2023-11-23 10:23:01",
    cc_num: 1234567890123456,
    merchant: "Global Travel Co.",
    category: "Travel",
    amt: 1200.0,
    first: "John",
    last: "Doe",
    gender: "M",
    street: "123 Main St",
    city: "Las Vegas",
    state: "NV",
    zip: 89101,
    lat: 36.1699,
    long: -115.1398,
    city_pop: 651319,
    job: "Software Engineer",
    dob: "1985-05-15",
    trans_num: "2023112310230001",
    unix_time: 1700736181,
    merch_lat: 36.1699,
    merch_long: -115.1398,
    is_fraud: false,
    fraudScore: 25,
  },
  {
    id: 2,
    trans_date_trans_time: "2023-11-23 02:45:22",
    cc_num: 9876543210987654,
    merchant: "TechGadgets Inc.",
    category: "Electronics",
    amt: 2500.0,
    first: "Jane",
    last: "Smith",
    gender: "F",
    street: "456 Elm St",
    city: "New York",
    state: "NY",
    zip: 10001,
    lat: 40.7128,
    long: -74.0060,
    city_pop: 8336817,
    job: "Marketing Manager",
    dob: "1990-08-22",
    trans_num: "2023112302452202",
    unix_time: 1700708722,
    merch_lat: 40.7128,
    merch_long: -74.0060,
    is_fraud: true,
    fraudScore: 85,
  },
  {
    id: 3,
    trans_date_trans_time: "2023-11-23 12:12:45",
    cc_num: 1111222233334444,
    merchant: "FoodDelivery Express",
    category: "Food",
    amt: 75.0,
    first: "Bob",
    last: "Johnson",
    gender: "M",
    street: "789 Oak St",
    city: "Chicago",
    state: "IL",
    zip: 60601,
    lat: 41.8781,
    long: -87.6298,
    city_pop: 2746388,
    job: "Teacher",
    dob: "1988-03-10",
    trans_num: "2023112312124503",
    unix_time: 1700742765,
    merch_lat: 41.8781,
    merch_long: -87.6298,
    is_fraud: false,
    fraudScore: 15,
  },
  {
    id: 4,
    trans_date_trans_time: "2023-11-24 03:30:15",
    cc_num: 5555666677778888,
    merchant: "LuxuryWatches Co.",
    category: "Jewelry",
    amt: 5000.0,
    first: "Alice",
    last: "Brown",
    gender: "F",
    street: "101 Pine Ave",
    city: "Miami",
    state: "FL",
    zip: 33101,
    lat: 25.7617,
    long: -80.1918,
    city_pop: 454279,
    job: "Executive",
    dob: "1982-12-03",
    trans_num: "2023112403301504",
    unix_time: 1700797815,
    merch_lat: 25.7617,
    merch_long: -80.1918,
    is_fraud: true,
    fraudScore: 90,
  },
  {
    id: 5,
    trans_date_trans_time: "2023-11-24 09:15:30",
    cc_num: 9999888877776666,
    merchant: "Grocery Store",
    category: "Groceries",
    amt: 150.0,
    first: "Charlie",
    last: "Davis",
    gender: "M",
    street: "222 Maple Dr",
    city: "Los Angeles",
    state: "CA",
    zip: 90001,
    lat: 34.0522,
    long: -118.2437,
    city_pop: 3898747,
    job: "Chef",
    dob: "1995-07-19",
    trans_num: "2023112409153005",
    unix_time: 1700818530,
    merch_lat: 34.0522,
    merch_long: -118.2437,
    is_fraud: false,
    fraudScore: 10,
  },
  {
    id: 6,
    trans_date_trans_time: "2023-11-24 14:45:00",
    cc_num: 4444333322221111,
    merchant: "Online Education Platform",
    category: "Education",
    amt: 399.0,
    first: "Eva",
    last: "Wilson",
    gender: "F",
    street: "333 Cedar Ln",
    city: "Seattle",
    state: "WA",
    zip: 98101,
    lat: 47.6062,
    long: -122.3321,
    city_pop: 753675,
    job: "Student",
    dob: "1998-02-14",
    trans_num: "2023112414450006",
    unix_time: 1700838300,
    merch_lat: 47.6062,
    merch_long: -122.3321,
    is_fraud: false,
    fraudScore: 5,
  },
  {
    id: 7,
    trans_date_trans_time: "2023-11-25 01:20:45",
    cc_num: 7777666655554444,
    merchant: "Late Night Gas Station",
    category: "Automotive",
    amt: 80.0,
    first: "David",
    last: "Lee",
    gender: "M",
    street: "444 Birch St",
    city: "Houston",
    state: "TX",
    zip: 77001,
    lat: 29.7604,
    long: -95.3698,
    city_pop: 2320268,
    job: "Truck Driver",
    dob: "1980-09-30",
    trans_num: "2023112501204507",
    unix_time: 1700874045,
    merch_lat: 29.7604,
    merch_long: -95.3698,
    is_fraud: true,
    fraudScore: 35,
  },
  {
    id: 8,
    trans_date_trans_time: "2023-11-25 11:05:30",
    cc_num: 3333222211110000,
    merchant: "Fitness Center",
    category: "Health",
    amt: 89.99,
    first: "Fiona",
    last: "Garcia",
    gender: "F",
    street: "555 Redwood Ave",
    city: "San Francisco",
    state: "CA",
    zip: 94102,
    lat: 37.7749,
    long: -122.4194,
    city_pop: 883305,
    job: "Fitness Instructor",
    dob: "1992-11-07",
    trans_num: "2023112511053008",
    unix_time: 1700909130,
    merch_lat: 37.7749,
    merch_long: -122.4194,
    is_fraud: false,
    fraudScore: 12,
  },
  {
    id: 9,
    trans_date_trans_time: "2023-11-25 16:40:15",
    cc_num: 2222111100009999,
    merchant: "Online Gaming Platform",
    category: "Entertainment",
    amt: 59.99,
    first: "George",
    last: "Martinez",
    gender: "M",
    street: "666 Spruce Ct",
    city: "Phoenix",
    state: "AZ",
    zip: 85001,
    lat: 33.4484,
    long: -112.0740,
    city_pop: 1680992,
    job: "Graphic Designer",
    dob: "1997-04-23",
    trans_num: "2023112516401509",
    unix_time: 1700929215,
    merch_lat: 33.4484,
    merch_long: -112.0740,
    is_fraud: false,
    fraudScore: 8,
  },
  {
    id: 10,
    trans_date_trans_time: "2023-11-26 08:55:00",
    cc_num: 8888777766665555,
    merchant: "Luxury Car Rental",
    category: "Travel",
    amt: 3500.0,
    first: "Hannah",
    last: "Kim",
    gender: "F",
    street: "777 Willow Way",
    city: "Las Vegas",
    state: "NV",
    zip: 89101,
    lat: 36.1699,
    long: -115.1398,
    city_pop: 651319,
    job: "Entrepreneur",
    dob: "1988-06-12",
    trans_num: "2023112608550010",
    unix_time: 1701000900,
    merch_lat: 36.1699,
    merch_long: -115.1398,
    is_fraud: true,
    fraudScore: 95,
  }
]

export function FraudDetectionTable({ showAll = false, type = "" }) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Filter transactions based on type
  const filteredAttempts = type === "alerts"
    ? recentAttempts.filter((attempt) => attempt.is_fraud)
    : recentAttempts;

  if (!Array.isArray(filteredAttempts) || filteredAttempts.length === 0) {
    return (
      <Card>
        <CardContent>
          <p>No recent transactions available.</p>
        </CardContent>
      </Card>
    );
  }

  const displayAttempts = showAll ? filteredAttempts : filteredAttempts.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span>Recent Card Transactions</span>
        </CardTitle>
        <CardDescription>
          {showAll ? "All recent" : "Last 3"} card transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Transaction ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Fraud Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayAttempts.map((attempt) => {
              const fraudScore = attempt.fraudScore;
              return (
                <TableRow key={attempt.id} className="hover:bg-gray-100">
                  <TableCell className="font-medium">{attempt.id}</TableCell>
                  <TableCell>{attempt.trans_date_trans_time}</TableCell>
                  <TableCell>{attempt.merchant}</TableCell>
                  <TableCell>{attempt.category}</TableCell>
                  <TableCell>${attempt.amt.toFixed(2)}</TableCell>
                  <TableCell>{`${attempt.first} ${attempt.last}`}</TableCell>
                  <TableCell>{attempt.city}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        fraudScore > 50
                          ? "destructive"
                          : fraudScore > 30
                          ? "secondary"
                          : "default"
                      }
                    >
                      {fraudScore}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={attempt.is_fraud ? "destructive" : "default"}
                    >
                      {attempt.is_fraud ? "Fraudulent" : "Legitimate"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTransaction(attempt)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Fraud Detection Analysis</DialogTitle>
                          <DialogDescription>
                            Detailed analysis of the transaction
                          </DialogDescription>
                        </DialogHeader>
                        {selectedTransaction && (
                          <FraudDetectionAnalysis transaction={selectedTransaction} />
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


