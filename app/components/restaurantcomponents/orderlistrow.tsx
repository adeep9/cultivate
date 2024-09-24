import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "../ui/button"
import Link from "next/link"

const OrderListRow = ({order}: any) => {
  return (
    <TableRow className="bg-white">
        <TableCell className="font-medium"> 
            {order.createdAt}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            {order.supplierId}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            {order.items.length}
        </TableCell>
        <TableCell className="hidden sm:table-cell">
            {order.status}
        </TableCell>
        <TableCell>
            <Button variant="outline">
                <Link href={`/restaurant/orders/${order.id}`}>View Order</Link>
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default OrderListRow