import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, TrendingUp, Bell, Upload } from 'lucide-react'
import { CardFraudTrendChart } from "./dashboard/_components/card-fraud-trend-chart"
import { CardFraudMetricsCards } from "./dashboard/_components/card-fraud-metrics-cards"
import { CardFraudOverview } from "./dashboard/_components/card-fraud-overview"
import { CardFraudTypeDistribution } from "./dashboard/_components/card-fraud-type-distribution"
import { FraudDetectionTable } from "./dashboard/_components/recent-card-fraud-attempts"
import { UploadFraudCase } from "./dashboard/_components/upload-fraud-case"


export default function DashboardPage() {
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Card Fraud Detection Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center justify-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            {/* <TabsTrigger value="analysis" className="flex items-center justify-center">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Fraud Analysis
            </TabsTrigger> */}
            <TabsTrigger value="trends" className="flex items-center justify-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center justify-center">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center justify-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload Case
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <CardFraudMetricsCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <CardFraudOverview />
              <CardFraudTypeDistribution />
            </div>
            <FraudDetectionTable type="overview"  showAll={true}/>
          </TabsContent>
          {/* <TabsContent value="analysis" className="space-y-4">
            <FraudDetectionAnalysis transaction={sampleTransaction} />
          </TabsContent> */}
          <TabsContent value="trends" className="space-y-4">
            <CardFraudTrendChart />
          </TabsContent>
          <TabsContent value="alerts" className="space-y-4">
          <FraudDetectionTable showAll={true} type="alerts" />
          </TabsContent>
          <TabsContent value="upload" className="space-y-4">
            <UploadFraudCase />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

