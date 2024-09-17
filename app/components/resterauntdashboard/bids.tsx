"use client";

import { DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Bids({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Bids</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$5000</div>
        <p className="text-xs text-green-400">+20.1% Savings</p>

        {/* Container to align the date and button side by side */}
        <div className="flex items-center justify-between pt-4 gap-4">
          <p className="text-xs font-medium text-gray-700">Wednesday 18th September</p>
          <Button variant="outline" onClick={() => alert('Outline Button Clicked')}>
            View Bid
          </Button>
        </div>

      </CardContent>
    </Card>
  );
}


