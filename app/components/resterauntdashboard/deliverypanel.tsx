"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import React from 'react';

type DeliveryPanelProps = {
  className?: string; // Optional className prop
};

export default function DeliveryPanel({ className }: DeliveryPanelProps) {
  return (
    <Card className={className}> {/* Merge provided className with internal styles */}
      <CardHeader className="pb-2">
        <CardDescription>Delivery Status</CardDescription>
        <CardTitle className="text-4xl">Warehouse</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">ETA : Wednesday 18th September</div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  );
}

