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

export default function ActiveOrders({ className = "" , id}: ActiveOrdersProps) {
  const [activeOrders, setActiveOrders] = useState()

  useEffect(() => {
    const getActiveOrders = async () => {
      const response = await fetch('/api/activepending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          type: "pending",
          id: id,
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

  useEffect(() => {
    console.log("Active Orders: ", activeOrders)
  }, [activeOrders])
  
  

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{activeOrders}</div>
        <p className="text-xs text-muted-foreground pt-12">Not yet accepted by a supplier</p>
      </CardContent>
    </Card>
  )
}
