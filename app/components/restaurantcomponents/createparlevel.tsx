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

export default function CreateParLevel() {

  //Get logged in user from session data
  //This user will be a restaurant 

  const loggedIn = {id: 1}


  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Need to change your par levels?</CardTitle>
        <CardDescription className="text-balance max-w-lg leading-relaxed">
          It's as easy as putting an order through!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href="/restaurant/parlevels/createpar">
          <Button>Update Par Levels</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
