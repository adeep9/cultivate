"use client"

import { Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PendingOrders({ className = "" }) {
  //Get number of active orders
  const orders = {
    pending: 2,
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{orders.pending}</div>
        <p className="text-xs text-muted-foreground pt-12">Sent to supplier, but not yet fullfilled</p>
      </CardContent>
    </Card>
  )
}
