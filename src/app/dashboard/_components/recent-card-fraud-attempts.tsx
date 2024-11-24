"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  DollarSign,
  Clock,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Transaction {
  id: number;
  trans_date_trans_time: string;
  cc_num: number;
  merchant: string;
  category: string;
  amt: number;
  first: string;
  last: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  zip: number;
  lat: number;
  long: number;
  city_pop: number;
  job: string;
  dob: string;
  trans_num: string;
  unix_time: number;
  merch_lat: number;
  merch_long: number;
  is_fraud: boolean;
  fraudScore: number;
}

// function deg2rad(deg: number): number {
//   return deg * (Math.PI / 180)
// }

function FraudDetectionAnalysis({ transaction }: { transaction: Transaction }) {
  const fraudScore = transaction.fraudScore;

  const getFraudLevel = (score: number) => {
    if (score < 30) return { level: "Low", color: "bg-green-500" };
    if (score < 70) return { level: "Medium", color: "bg-yellow-500" };
    return { level: "High", color: "bg-red-500" };
  };

  const { level, color } = getFraudLevel(fraudScore);

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
        <Badge
          variant={
            level === "Low"
              ? "default"
              : level === "Medium"
              ? "secondary"
              : "destructive"
          }
        >
          {level} Risk
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Transaction Amount: ${transaction.amt.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Transaction Time:{" "}
            {new Date(transaction.trans_date_trans_time).toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Transaction Location: {transaction.city}, {transaction.state}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Merchant Category: {transaction.category}
          </span>
        </div>
      </div>
    </div>
  );
}

const recentAttempts: Transaction[] = [
  {
    id: 1,
    trans_date_trans_time: "2023-11-23 10:23:01",
    cc_num: 1234567890123456,
    merchant: "AirAsia",
    category: "Travel",
    amt: 1200.0,
    first: "Ahmad",
    last: "bin Abdullah",
    gender: "M",
    street: "123 Jalan Bukit Bintang",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 50200,
    lat: 3.1478,
    long: 101.7068,
    city_pop: 1780000,
    job: "Software Engineer",
    dob: "1985-05-15",
    trans_num: "2023112310230001",
    unix_time: 1700736181,
    merch_lat: 3.1478,
    merch_long: 101.7068,
    is_fraud: false,
    fraudScore: 25,
  },
  {
    id: 2,
    trans_date_trans_time: "2023-11-23 02:45:22",
    cc_num: 9876543210987654,
    merchant: "Lazada Malaysia",
    category: "Electronics",
    amt: 2500.0,
    first: "Siti",
    last: "binti Zainuddin",
    gender: "F",
    street: "456 Persiaran KLCC",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 50088,
    lat: 3.1577,
    long: 101.7122,
    city_pop: 1780000,
    job: "Marketing Manager",
    dob: "1990-08-22",
    trans_num: "2023112302452202",
    unix_time: 1700708722,
    merch_lat: 3.1577,
    merch_long: 101.7122,
    is_fraud: true,
    fraudScore: 85,
  },
  {
    id: 3,
    trans_date_trans_time: "2023-11-23 12:12:45",
    cc_num: 1111222233334444,
    merchant: "Grab Food",
    category: "Food",
    amt: 75.0,
    first: "Raj",
    last: "Kumar",
    gender: "M",
    street: "789 Lebuh Armenian",
    city: "George Town",
    state: "Pulau Pinang",
    zip: 10200,
    lat: 5.4141,
    long: 100.3288,
    city_pop: 708127,
    job: "Teacher",
    dob: "1988-03-10",
    trans_num: "2023112312124503",
    unix_time: 1700742765,
    merch_lat: 5.4141,
    merch_long: 100.3288,
    is_fraud: false,
    fraudScore: 15,
  },
  {
    id: 4,
    trans_date_trans_time: "2023-11-24 03:30:15",
    cc_num: 5555666677778888,
    merchant: "Habib Jewels",
    category: "Jewelry",
    amt: 5000.0,
    first: "Nurul",
    last: "binti Hassan",
    gender: "F",
    street: "101 Jalan Wong Ah Fook",
    city: "Johor Bahru",
    state: "Johor",
    zip: 80000,
    lat: 1.4655,
    long: 103.7578,
    city_pop: 497097,
    job: "Executive",
    dob: "1982-12-03",
    trans_num: "2023112403301504",
    unix_time: 1700797815,
    merch_lat: 1.4655,
    merch_long: 103.7578,
    is_fraud: true,
    fraudScore: 90,
  },
  {
    id: 5,
    trans_date_trans_time: "2023-11-24 09:15:30",
    cc_num: 9999888877776666,
    merchant: "Tesco Malaysia",
    category: "Groceries",
    amt: 150.0,
    first: "Chong",
    last: "Wei Ming",
    gender: "M",
    street: "222 Jalan Genting Klang",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 53300,
    lat: 3.2039,
    long: 101.7163,
    city_pop: 1780000,
    job: "Chef",
    dob: "1995-07-19",
    trans_num: "2023112409153005",
    unix_time: 1700818530,
    merch_lat: 3.2039,
    merch_long: 101.7163,
    is_fraud: false,
    fraudScore: 10,
  },
  {
    id: 6,
    trans_date_trans_time: "2023-11-24 14:45:00",
    cc_num: 4444333322221111,
    merchant: "Universiti Malaya",
    category: "Education",
    amt: 399.0,
    first: "Aisha",
    last: "binti Yusof",
    gender: "F",
    street: "333 Jalan Universiti",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 50603,
    lat: 3.1209,
    long: 101.6538,
    city_pop: 1780000,
    job: "Student",
    dob: "1998-02-14",
    trans_num: "2023112414450006",
    unix_time: 1700838300,
    merch_lat: 3.1209,
    merch_long: 101.6538,
    is_fraud: false,
    fraudScore: 5,
  },
  {
    id: 7,
    trans_date_trans_time: "2023-11-25 01:20:45",
    cc_num: 7777666655554444,
    merchant: "Petronas Station",
    category: "Automotive",
    amt: 80.0,
    first: "Muthu",
    last: "Saravanan",
    gender: "M",
    street: "444 Jalan Tun Razak",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 50400,
    lat: 3.1602,
    long: 101.7200,
    city_pop: 1780000,
    job: "Truck Driver",
    dob: "1980-09-30",
    trans_num: "2023112501204507",
    unix_time: 1700874045,
    merch_lat: 3.1602,
    merch_long: 101.7200,
    is_fraud: true,
    fraudScore: 35,
  },
  {
    id: 8,
    trans_date_trans_time: "2023-11-25 11:05:30",
    cc_num: 3333222211110000,
    merchant: "Fitness First Malaysia",
    category: "Health",
    amt: 89.99,
    first: "Lim",
    last: "Mei Ling",
    gender: "F",
    street: "555 Jalan Sultan Ismail",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 50250,
    lat: 3.1516,
    long: 101.7092,
    city_pop: 1780000,
    job: "Fitness Instructor",
    dob: "1992-11-07",
    trans_num: "2023112511053008",
    unix_time: 1700909130,
    merch_lat: 3.1516,
    merch_long: 101.7092,
    is_fraud: false,
    fraudScore: 12,
  },
  {
    id: 9,
    trans_date_trans_time: "2023-11-25 16:40:15",
    cc_num: 2222111100009999,
    merchant: "Steam",
    category: "Entertainment",
    amt: 59.99,
    first: "Amir",
    last: "bin Ismail",
    gender: "M",
    street: "666 Jalan Ampang",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 50450,
    lat: 3.1619,
    long: 101.7440,
    city_pop: 1780000,
    job: "Graphic Designer",
    dob: "1997-04-23",
    trans_num: "2023112516401509",
    unix_time: 1700929215,
    merch_lat: 3.1619,
    merch_long: 101.7440,
    is_fraud: false,
    fraudScore: 8,
  },
  {
    id: 10,
    trans_date_trans_time: "2023-11-26 08:55:00",
    cc_num: 8888777766665555,
    merchant: "Sime Darby Auto Bavaria",
    category: "Automotive",
    amt: 3500.0,
    first: "Tan",
    last: "Siew Bee",
    gender: "F",
    street: "777 Jalan Tun Razak",
    city: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    zip: 50400,
    lat: 3.1602,
    long: 101.7200,
    city_pop: 1780000,
    job: "Entrepreneur",
    dob: "1988-06-12",
    trans_num: "2023112608550010",
    unix_time: 1701000900,
    merch_lat: 3.1602,
    merch_long: 101.7200,
    is_fraud: true,
    fraudScore: 95,
  },
];

export function FraudDetectionTable({ showAll = false, type = "" }) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Filter transactions based on type
  const filteredAttempts =
    type === "alerts"
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

  const displayAttempts = showAll
    ? filteredAttempts
    : filteredAttempts.slice(0, 3);

    return (
      <Card className="w-full">
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
          <div className="relative w-full overflow-auto">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[100px] sticky top-0 bg-white z-10">Transaction ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Date & Time</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Merchant</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Category</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Customer</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">City</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Fraud Score</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 sticky top-0 bg-white z-10">Action</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {displayAttempts.map((attempt) => {
                    const fraudScore = attempt.fraudScore;
                    return (
                      <tr key={attempt.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{attempt.id}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{attempt.trans_date_trans_time}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{attempt.merchant}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{attempt.category}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">RM{attempt.amt.toFixed(2)}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{`${attempt.first} ${attempt.last}`}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{attempt.city}</td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
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
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <Badge
                            variant={attempt.is_fraud ? "destructive" : "default"}
                          >
                            {attempt.is_fraud ? "Fraudulent" : "Legitimate"}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
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
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  