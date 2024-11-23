import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Clock, Activity, DollarSign } from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    trustScore: number
    behaviorScore: number
    accountAge: number
    transactionFrequency: number
    spendingBehavior: number
  }
}

export function UserProfileCard({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-6 w-6" />
          <span>User Profile</span>
        </CardTitle>
        <CardDescription>ID: {user.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg">
            <Shield className="h-8 w-8 mb-2 text-blue-500" />
            <p className="text-sm font-medium">Trust Score</p>
            <Badge variant={user.trustScore > 0.5 ? "default" : "destructive"} className="mt-1">
              {user.trustScore.toFixed(4)}
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg">
            <Activity className="h-8 w-8 mb-2 text-green-500" />
            <p className="text-sm font-medium">Behavior Score</p>
            <p className="text-lg font-bold">{user.behaviorScore.toFixed(2)}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg">
            <Clock className="h-8 w-8 mb-2 text-purple-500" />
            <p className="text-sm font-medium">Account Age</p>
            <p className="text-lg font-bold">{user.accountAge} years</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg">
            <DollarSign className="h-8 w-8 mb-2 text-yellow-500" />
            <p className="text-sm font-medium">Spending Behavior</p>
            <p className="text-lg font-bold">{user.spendingBehavior.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

