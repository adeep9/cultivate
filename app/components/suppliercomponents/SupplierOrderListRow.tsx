import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "../ui/button"
import Link from "next/link"

const SupplierOrderListRow = ({order}: any) => {
  return (
    <TableRow className="bg-white">
        <TableCell className="hidden sm:table-cell">
            {order.id}
        </TableCell>
        <TableCell className="font-medium"> 
            {new Date(order.dateDue).toLocaleDateString()}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            {order.supplierId}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            {order.items.length}
        </TableCell>
        <TableCell className="font-medium">
            {order.status === "Pending" ? (
                <p className="text-orange-500">Pending</p>
            ) : order.status === "Active" ? (
                <p className="text-green-500">Active</p>
            ) : order.status === "Fulfilled" ? (
                <p className="text-blue-500">Fulfilled</p>
            ) : (
                <p className="text-gray-500">Cancelled</p> 
            )}
        </TableCell>
        <TableCell className="hidden sm:table-cell text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell>
            <Button variant="outline">
                Accept
            </Button>
        </TableCell>
        <TableCell>
            <Button variant="link">
            <Link href={`/supplier/orders/${order.id}`}>View Order</Link>
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default SupplierOrderListRow