"use client"

import { Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CurrentOrder({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">2</div>
        <p className="text-xs text-muted-foreground pt-12">Currently on our market but not fullfilled</p>
      </CardContent>
    </Card>
  )
}
