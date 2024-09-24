"use client";

import { DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ActiveOrders({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tighter text-red-500">Awaiting Approval</div>
        <p className="text-xs text-green-400 pt-3"></p>

        {/* Container to align the date and button side by side */}
        <div className="flex items-center justify-between pt-4 gap-4">
          <p className="text-xs font-medium text-gray-700"></p>
          <Button variant="outline" onClick={() => alert('Outline Button Clicked')}>
            Approve Order
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}