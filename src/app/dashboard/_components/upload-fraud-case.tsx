"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UploadFraudCase() {
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsUploading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    // Reset form or show success message
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Fraud Case</CardTitle>
        <CardDescription>Provide details about a new fraud case for analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="caseId">Case ID</Label>
              <Input id="caseId" placeholder="Enter case ID" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fraudType">Fraud Type</Label>
              <Select required>
                <SelectTrigger id="fraudType">
                  <SelectValue placeholder="Select fraud type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identity_theft">Identity Theft</SelectItem>
                  <SelectItem value="card_not_present">Card Not Present</SelectItem>
                  <SelectItem value="counterfeit_card">Counterfeit Card</SelectItem>
                  <SelectItem value="account_takeover">Account Takeover</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Case Description</Label>
            <Textarea id="description" placeholder="Provide a detailed description of the fraud case" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Fraudulent Amount</Label>
              <Input id="amount" type="number" placeholder="Enter amount" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date of Occurrence</Label>
              <Input id="date" type="date" required />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Submit Fraud Case"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

