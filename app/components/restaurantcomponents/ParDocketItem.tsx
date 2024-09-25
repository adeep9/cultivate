export interface ParItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  interface ParDocketItemProps {
    parItem: ParItemProps;
  }
  
  const ParDocketItem = ({parItem}: ParDocketItemProps) => {
    const totalprice = parItem.price * parItem.quantity
    return (
      <li className="flex items-center justify-between">
          <span className="text-muted-foreground">
          {parItem.name} x <span>{parItem.quantity}</span>
          </span>
          <span>{totalprice}</span>
      </li>
    )
  }
  
  export default ParDocketItem