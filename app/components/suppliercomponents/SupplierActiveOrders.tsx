"use client"

import { Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

interface ActiveOrdersProps {
  className: string;
  id: number;
}

export default function SupplierActiveOrders({ className = "" , id}: ActiveOrdersProps) {
  const [activeOrders, setActiveOrders] = useState()

  useEffect(() => {
    const getActiveOrders = async () => {
      const response = await fetch('/api/activepending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          type: "active",
          id: id,
          supplier: true,
        }),
      });

      if (!response.ok) {
        console.error('Error retrieving order');
        return;
      }

      const data = await response.json();  // Parse response JSON
      setActiveOrders(data)
    };
    getActiveOrders();
  }, []) //run on mount

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{activeOrders}</div>
        <p className="text-xs text-muted-foreground pt-12">Current being fulfilled. Make sure you update them!</p>
      </CardContent>
    </Card>
  )
}