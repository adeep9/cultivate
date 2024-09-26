"use client"

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

interface OrderListProps {
  id: number
}

export default function Orderlist({id}:OrderListProps) {
  //Get logged in restaurant session data
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch order data for a specific restaurant
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/rorders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            id: id
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data); // Store the fetched orders in the state
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
              <TableHead className="hidden sm:table-cell">SKU</TableHead>
              <TableHead className="table-cell">Due Date</TableHead>
              <TableHead className="hidden sm:table-cell">Supplier</TableHead>
              <TableHead className="hidden sm:table-cell">Items</TableHead>
              <TableHead className="table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <div className="flex flex-row justify-center items-center">
                    <div className="loader"></div>
                    <p className="text-lg p-4">Loading orders...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders ? (
                orders.map((order: any) => (
                  <OrderListRow order={order} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center"> {/* Centering horizontally */}
                    <p className="text-lg p-5 m-5">You don't have any orders yet.</p>
                  </TableCell>
                </TableRow>
              ) 
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
