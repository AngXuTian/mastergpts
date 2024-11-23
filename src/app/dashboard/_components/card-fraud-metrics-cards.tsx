import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";
import { calculateFraudScore, Transaction } from "../../../utils/fraudScoring";

const sampleTransactions: Transaction[] = [
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
];

export function CardFraudMetricsCards() {
  const totalTransactions = sampleTransactions.length;
  const fraudAttempts = sampleTransactions.filter((t) => t.is_fraud).length;
  const averageFraudScore =
    sampleTransactions.reduce((sum, t) => sum + calculateFraudScore(t), 0) /
    totalTransactions;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Card Transactions
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTransactions}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Detected Fraud Attempts
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{fraudAttempts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Fraud Score
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averageFraudScore.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Fraud Detection Rate
          </CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {((fraudAttempts / totalTransactions) * 100).toFixed(2)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
