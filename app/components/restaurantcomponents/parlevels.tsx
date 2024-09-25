"use client"

import { CreditCard } from "lucide-react"

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

export default function ParLevels({ className = "" , id}: ActiveOrdersProps) {

  const [parStatus, setParStatus] = useState<boolean>()

  useEffect(() => {
    const getParStatus = async () => {
      const response = await fetch('/api/parinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: id,
        }),
      });

      if (!response.ok) {
        console.error('Error retrieving par info');
        return;
      }
      const data = await response.json();
      if (data.length === 0) {
        setParStatus(false)
      } else {
        setParStatus(true)
      }
    };
    getParStatus();
  }, []) //run on mount

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Par Levels</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {parStatus ? 
          <>
            <div className="text-2xl font-bold">Uploaded</div>
            <p className="text-xs text-muted-foreground pt-12">Need to edit your par levels?</p>
          </>
        :
          <>
            <div className="text-2xl font-bold">Not Uploaded</div>
            <p className="text-xs text-muted-foreground pt-12">Upload your par levels today!</p>
          </>
        }        
      </CardContent>
    </Card>
  )
}



 