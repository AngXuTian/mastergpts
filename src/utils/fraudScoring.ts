export interface Transaction {
  id: number;
  trans_date_trans_time: string;
  merchant: string;
  category: string;
  amt: number;
  first: string;
  last: string;
  city: string;
  is_fraud: boolean;
}

export function calculateFraudScore(transaction: Transaction): number {
  let score = 0;

  // High amount transactions
  if (transaction.amt > 1000) score += 20;

  // Transactions at odd hours (between 1 AM and 5 AM)
  const hour = new Date(transaction.trans_date_trans_time).getHours();
  if (hour >= 1 && hour <= 5) score += 15;

  // Transactions in high-risk categories
  const highRiskCategories = ['Jewelry', 'Electronics', 'Travel'];
  if (highRiskCategories.includes(transaction.category)) score += 10;

  // Transactions in high-risk cities (this list should be updated based on real data)
  const highRiskCities = ['Las Vegas', 'Miami', 'New York'];
  if (highRiskCities.includes(transaction.city)) score += 15;

  // Cap the score at 100
  return Math.min(score, 100);
}

