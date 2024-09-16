"use client";

import { DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Bids({ className = "" }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Bids</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$5000</div>
        <p className="text-xs text-green-400">+20.1% Savings</p>
        <p className="text-xs font-medium text-gray-700 pt-8">Wednesday 18th September</p>
      </CardContent>
    </Card>
  );
}

