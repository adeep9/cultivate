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

export default function Create() {

  //Get logged in user from session data
  //This user will be a restaurant 

  const loggedIn = {name: "Gnocchi Gnocchi Springhill"}


  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Welcome back, <b>{loggedIn.name}</b></CardTitle>
        <CardDescription className="text-balance max-w-lg leading-relaxed">
          Lets get started with a new order to your supplier!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href="/restaurant/createorder">
          <Button>Create New Order</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

