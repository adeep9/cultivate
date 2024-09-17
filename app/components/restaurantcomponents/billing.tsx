"use client"

import { CreditCard } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Billing({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Billing</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$0</div>
        <p className="text-xs font-medium text-gray-700 pt-12 translate-y-[1px]">Nothing outstanding</p>
        
      </CardContent>
    </Card>
  )
}
