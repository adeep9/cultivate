"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import OrderListRow from "./orderlistrow"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Orderlist() {
  //Get logged in restaurant session data
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Fetch order data for a specific restaurant
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/rorders'); // API route defined in route.ts
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data); // Store the fetched orders in the state
        console.log(orders)
      } catch (error) {
        console.log(error);
      } finally {
        //setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Below are your most recent orders to your supplier.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell">Supplier</TableHead>
              <TableHead className="hidden sm:table-cell">Items</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/** For loop mapping all the orders */}
            {orders.map((order: any) => (
                <OrderListRow order={order} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
