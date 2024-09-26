"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from 'react'

export default function Create({id}:{id:number}) {
  const [userData, setUserData] = useState()
  //Get name from id
  useEffect(() => {
    const restaurantName = async () => {
      try {
        const response = await fetch('/api/restaurant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),  // Passing `id` as a JSON object
        });
        if (response.ok) {
          const data = await response.json();
          const name = data.name
          setUserData(name)
        } 
      } catch (error) {
        console.error("Error fetching restaurant name", error)
      }
    }

    restaurantName();
  }, []) //on mount
  
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-balance max-w-xl leading-relaxed">Welcome back <span className="font-extrabold">{userData ? userData : ""}</span></CardTitle>
        <CardDescription className="text-balance max-w-lg leading-relaxed">
          Lets get started with a new order to your supplier!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href="createorder" className="z-10">
          <Button>Create New Order</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

