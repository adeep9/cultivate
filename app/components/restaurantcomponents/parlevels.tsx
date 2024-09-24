"use client"

import { CreditCard } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ParLevels({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Par Levels</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Uploaded</div>
        <p className="text-xs text-muted-foreground pt-12">Need to edit your par levels?</p>
        {/* <p className="text-xs text-muted-foreground pt-12">Upload Par-Levels to make ordering faster</p> */}
      </CardContent>
    </Card>
  )
}



 