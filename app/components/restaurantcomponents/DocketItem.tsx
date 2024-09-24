export interface OrderItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface DocketItemProps {
  orderItem: OrderItemProps;
}

const DocketItem = ({orderItem}: DocketItemProps) => {
  const totalprice = orderItem.price * orderItem.quantity
  return (
    <li className="flex items-center justify-between">
        <span className="text-muted-foreground">
        {orderItem.name} x <span>{orderItem.quantity}</span>
        </span>
        <span>{totalprice}</span>
    </li>
  )
}

export default DocketItem