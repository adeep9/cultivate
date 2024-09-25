export interface OrderItemProps {
  id: number;
  name: string;
  price: number;
  unit: string;
  volume: number;
}

interface DocketItemProps {
  orderItem: OrderItemProps;
}

const DocketItem = ({orderItem}: DocketItemProps) => {
  const totalprice = orderItem.price * orderItem.volume
  return (
    <li className="flex items-center justify-between">
        <span className="text-muted-foreground">
        {orderItem.name} x <span>{orderItem.volume}</span>
        </span>
        <span>{totalprice}</span>
    </li>
  )
}

export default DocketItem