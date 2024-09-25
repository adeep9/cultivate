"use client"

import {
  MoreVertical,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import DocketItem from "./DocketItem"
import ParDocketItem from "./ParDocketItem"

export interface ParLevelItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ParLevelinfo {
  id: number;
  createdAt: Date;
}

export default function ParLevelDocket() {

  const [parLevelItemsArray, setParLevelItemsArray] = useState<ParLevelItem[]>([]);
  const [parLevelInfo, setParLevelInfo] = useState<ParLevelinfo | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  //Get restaurant id from session data
  const isLoggedIn = {
    id: 1
  }

  useEffect(() => {
    //Get par level info (createdAt and id)
    const getParLevelinfo =  async () => {
      if (isLoggedIn) {
        setIsLoading(true)
        try {
          const response = await fetch('/api/parinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: isLoggedIn.id }),  // Passing `id` as a JSON object
          });
  
          if (!response.ok) {
            console.error('Error retrieving par leve info');
            return;
          }
  
          const data = await response.json();  // Parse response JSON
          setParLevelInfo(data[0]) //came in an array for some reason idk

        } catch (error) {
          console.log(error)
        }
      }
    };
    getParLevelinfo();
  }, [])

  useEffect(() => {
    //Using par level id. Get array of par level items
    const getParLevelItemsArray = async () => {
      if (parLevelInfo) {
        if (parLevelInfo.id) {
          const response = await fetch('/api/paritems', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: parLevelInfo.id }),  // Passing `id` as a JSON object
          });
  
          if (!response.ok) {
            console.error('Error retrieving par level items');
            return;
          }
  
          const data = await response.json();  // Parse response JSON
          setParLevelItemsArray(data)
        } 
      }
      
    };
    getParLevelItemsArray(); //call function
  }, [parLevelInfo])
  
  useEffect(() => {
    // Count the total number of items
    const itemTotal = parLevelItemsArray.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);
    setTotalItems(itemTotal);

    const priceTotal = parLevelItemsArray.reduce((accumulator, item) => {
      return accumulator + item.price*item.quantity;
    }, 0);
    setTotalPrice(priceTotal);

  }, [parLevelItemsArray]);

  useEffect(() => {
    if(parLevelItemsArray.length > 0) {
      setIsLoading(false)
    }
  }, [parLevelItemsArray])
  
    
  return (
    <Card className="overflow-hidden min-w-96">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Current Par Levels
          </CardTitle>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Print</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Par Level Item Details</div>

          {isLoggedIn ? (
            isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="loader"/>
                <p className="text-lg font-semibold text-muted-foreground p-4">Loading Par Levels...</p>
              </div>
            ) : (
              parLevelItemsArray ? (
                parLevelItemsArray.map((parLevelItem) => 
                <ParDocketItem parItem={parLevelItem} />)
                ) : (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <p className="text-lg font-semibold">You dont have any par levels.</p>
                  </div>
                )
            )
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg font-semibold">Login to see your par levels..</p>
            </div>
          )
          }

          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Unique Items</span>
              {/** Calculate Num of Items */}
              <span>{parLevelItemsArray.length}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Items</span>
              {/** Calculate Num of Items */}
              <span>{totalItems}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total Price</span>
              {/** Calculate Sum of items */}
              <span>{totalPrice}</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <p>Created at: {new Date(parLevelInfo ? parLevelInfo.createdAt : "Loading Creation Date...").toLocaleDateString()}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
