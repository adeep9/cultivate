"use client"
import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "../ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

const SupplierOrderListRow = ({order}: any) => {

    const [orderData, setOrderData] = useState(order)

    useEffect(() => {
        //
    }, [])
    
    const handleAccept = async () => {
        //Change on database using order id
        if (orderData.status) {
            try {
                const response = await fetch('/api/updatestatus', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                      id: order.id,
                      status: "Accepted",
                    }),
                  });
          
                  if (!response.ok) {
                    throw new Error('Failed to update order');
                  }
            } catch (error) {
                console.log("Could not fulfill order", error)
            }
        }
        //Set order data
        setOrderData({
            ...orderData,
            status: "Active"
        })
    }

    const handleFulfill = async () => {
        //Change on database
        if (orderData.status) {
            try {
                const response = await fetch('/api/updatestatus', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                      id: order.id,
                      status: "Fulfilled"
                    }),
                  });
          
                  if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                  }
            } catch (error) {
                console.log("Could not fulfill order", error)
            }
        }
        //Set order data
        setOrderData({
            ...orderData,
            status: "Fulfilled"
        })
        
    }

  return (
    <TableRow className="bg-white">
        <TableCell className="hidden sm:table-cell">
            {orderData.id}
        </TableCell>
        <TableCell className="font-medium"> 
            {new Date(orderData.dateDue).toLocaleDateString()}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            {orderData.supplierId}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            {orderData.items.length}
        </TableCell>
        <TableCell className="font-medium">
            {orderData.status === "Pending" ? (
                <p className="text-orange-500">Pending</p>
            ) : orderData.status === "Active" ? (
                <p className="text-green-500">Active</p>
            ) : orderData.status === "Fulfilled" ? (
                <p className="text-blue-500">Fulfilled</p>
            ) : (
                <p className="text-gray-500">DEFAULT</p> 
            )}
        </TableCell>
        <TableCell className="hidden sm:table-cell text-gray-500">
            {new Date(orderData.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
        {orderData.status === "Pending" ? (
                <Button variant={"outlinegreen"} onClick={handleAccept}>
                    Accept
                </Button>
            ) : orderData.status === "Active" ? (
                <Button variant={"outlineblue"} onClick={handleFulfill}>
                    Fulfill
                </Button>
            ): (
                <Button variant={"outlinegray"}>
                    Archive
                </Button>
            )}
        </TableCell>
        <TableCell>
            <Button variant="link">
            <Link href={`/supplier/orders/${orderData.id}`}>View Order</Link>
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default SupplierOrderListRow