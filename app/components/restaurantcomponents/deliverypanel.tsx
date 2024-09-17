"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import React from 'react';
import Image from 'next/image';

type DeliveryPanelProps = {
  className?: string; // Optional className prop
};

export default function DeliveryPanel({ className }: DeliveryPanelProps) {
  return (
    <Card className={className}>

      {/* CardHeader remains the same with relative positioning to allow absolute positioning of the Button */}
      <CardHeader className="pb-2 relative">
        <CardDescription>Delivery Status</CardDescription>
        <CardTitle className="text-4xl">Warehouse</CardTitle>

        {/* Button in the top-right corner with absolute positioning */}
        <Button 
          variant="outline" 
          onClick={() => alert('Outline Button Clicked')}
          className="absolute top-0 right-0 mt-2 mr-4 translate-y-2"
        >
          <img 
            src="/phone.svg" 
            alt="View Bid" 
            className="h-4 w-4" // Adjust size as needed
          />
        </Button>
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


