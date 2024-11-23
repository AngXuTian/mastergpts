"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { calculateFraudScore, Transaction } from "../../../utils/fraudScoring";

const recentAttempts: Transaction[] = [
  {
    id: 1,
    trans_date_trans_time: "2023-11-23 10:23:01",
    merchant: "Global Travel Co.",
    category: "Travel",
    amt: 1200.0,
    first: "John",
    last: "Doe",
    city: "Las Vegas",
    is_fraud: false,
  },
  {
    id: 2,
    trans_date_trans_time: "2023-11-23 02:45:22",
    merchant: "TechGadgets Inc.",
    category: "Electronics",
    amt: 500.0,
    first: "Jane",
    last: "Smith",
    city: "New York",
    is_fraud: true,
  },
  {
    id: 3,
    trans_date_trans_time: "2023-11-23 12:12:45",
    merchant: "FoodDelivery Express",
    category: "Food",
    amt: 75.0,
    first: "Bob",
    last: "Johnson",
    city: "London",
    is_fraud: false,
  },
  {
    id: 4,
    trans_date_trans_time: "2023-11-23 13:33:17",
    merchant: "LuxuryWatches Co.",
    category: "Jewelry",
    amt: 2000.0,
    first: "Alice",
    last: "Brown",
    city: "Paris",
    is_fraud: true,
  },
  {
    id: 5,
    trans_date_trans_time: "2023-11-23 14:55:39",
    merchant: "OnlineEdu Platform",
    category: "Education",
    amt: 300.0,
    first: "Charlie",
    last: "Davis",
    city: "Sydney",
    is_fraud: false,
  },
];

export function RecentCardFraudAttempts({ showAll = false }) {
  if (!Array.isArray(recentAttempts) || recentAttempts.length === 0) {
    return (
      <Card>
        <CardContent>
          <p>No recent transactions available.</p>
        </CardContent>
      </Card>
    );
  }

  const displayAttempts = showAll ? recentAttempts : recentAttempts.slice(0, 3);

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayAttempts.map((attempt) => {
              const fraudScore = calculateFraudScore(attempt);
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
                          ? "default"
                          : fraudScore > 30
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {fraudScore.toFixed(0)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={attempt.is_fraud ? "destructive" : "default"}
                    >
                      {attempt.is_fraud ? "Fraudulent" : "Legitimate"}
                    </Badge>
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
