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

export default function SupplierOrderHeader() {

  //Get logged in user from session data
  //This user will be a supplier 

  const loggedIn = {name: "Gnocchi Gnocchi Supply"}

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-balance max-w-xl leading-relaxed">Welcome back, <span className="font-extrabold">{loggedIn.name}</span></CardTitle>
        <CardDescription className="text-balance max-w-lg leading-relaxed">
          Check out the newest orders from the restaurants!
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
