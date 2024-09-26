"use client"

import {
  Check,
  Copy,
  MoreVertical,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
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

import { OrderItemProps } from "./DocketItem"

import { useRouter } from "next/navigation"

interface Order {
  createdAt: Date;
  dateDue: Date;
  id: number;
  lastUpdated: Date;
  notes: string;
  restaurantId: number;
  status: string;
  supplierId: number;
}

interface Restaurant {
  name: string;
  email: string;
  id: number;
  phone: string;
  address1: string;
  city: string;
  state: string;
  postcode: number;
  country: string;
}

interface Supplier {
  name: string;
  email: string;
  id: number;
  phone: string;
}

interface DocketProps {
  orderId: number
  supplier?: boolean;
}

export default function Docket({orderId, supplier = false}: DocketProps) {

  const [order, setOrder] = useState<Order | null>(null);
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [supplierData, setSupplierData] = useState<Supplier | null>(null);
  const [orderItemsArray, setOrderItemsArray] = useState<OrderItemProps[]>([]);
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const router = useRouter();

  useEffect(() => {
    // Function to fetch order information
    const findOrder = async () => {
      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: orderId }),  // Passing `id` as a JSON object
        });

        if (!response.ok) {
          console.error('Error retrieving order');
          return;
        }

        const data: Order = await response.json();  // Parse response JSON
        setOrder(data)

      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    findOrder(); // Run `findOrder` on component mount
  }, [])

  useEffect(() => {
    //Get restaurant information
    //Name, email, phone and address
    const getRestaurantData = async () => {
      if (!order) return;

      if (order.restaurantId) {
        const response = await fetch('/api/restaurant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: order.restaurantId }),  // Passing `id` as a JSON object
        });

        if (!response.ok) {
          console.error('Error retrieving restaurant data');
          return;
        }

        const data = await response.json();  // Parse response JSON
        setRestaurantData(data)
        console.log(restaurantData)
      }
    };
    getRestaurantData(); //call function

    //Get supplier information
    //Name, email and phone
    const getSupplierData = async () => {
      if (!order) return;

      if (order.supplierId) {
        const response = await fetch('/api/supplier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: order.supplierId }),  // Passing `id` as a JSON object
        });

        if (!response.ok) {
          console.error('Error retrieving supplier data');
          return;
        }

        const data = await response.json();  // Parse response JSON
        setSupplierData(data)
        console.log(supplierData)
      }
    };
    getSupplierData(); //call function


    //Get order item array
    const getOrderItemArray = async () => {
      if (!order) return;

      if (order.id) {
        const response = await fetch('/api/orderitems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: order.id }),  // Passing `id` as a JSON object
        });

        if (!response.ok) {
          console.error('Error retrieving order items');
          return;
        }

        const data = await response.json();  // Parse response JSON
        setOrderItemsArray(data)
      }
    };
    getOrderItemArray(); //call function

  }, [order])

  useEffect(() => {
    // Count the total number of items
    const itemTotal = orderItemsArray.reduce((accumulator, item) => {
      return accumulator + item.volume;
    }, 0);
    setTotalItems(itemTotal);

    const priceTotal = orderItemsArray.reduce((accumulator, item) => {
      return accumulator + item.price*item.volume;
    }, 0);
    setTotalPrice(priceTotal);

  }, [orderItemsArray]);

  //Function edit order
  const editOrder = () => {
    //push to edit page with id 
    router.push(`/restaurant/orders/${order?.id}/${order?.id}`)
    
  }

  //Function to delete order
  const deleteOrder = async () => {
    //Double check
    const confirmed = confirm("Are you sure you want to delete this order?");
      //Delete from database
      if (confirmed) {
      if (order) {
        const response = await fetch('/api/deleteorder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: order.id }),  // Passing `id` as a JSON object
        });

        if (response.ok) {
          alert("Order Deleted Successfully")
        } else {
          alert("Order Could Not Be Deleted")
          return;
        }

      } else {
        console.error("Could not delete order. Order does not exists")
        return;
      }
    
      //Push to orders page
      //Will need to make this dynamic with session data userType
      router.push('/restaurant/orders')
      return;
    }
    return;
  }

  const printOrder = () => {
    //Print function
  }
    
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order #{order ? order.id : "Loading..."}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Due Date: {new Date(order ? order.dateDue : "Loading Order Creation Date").toLocaleDateString()}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {supplier && (
            <Button size="sm" variant="outline" className="h-8 gap-1 bg-green-500 text-white hover:bg-green-600">
              <Check className="h-3.5 w-3.5" />
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Accept order
              </span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!supplier && (
                <DropdownMenuItem>
                  <Button 
                  type="button" 
                  onClick={editOrder} 
                  variant={"outline"}
                  className="w-full"
                  >
                    Edit
                  </Button>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuItem>
                <Button 
                type="button" 
                onClick={printOrder} 
                variant={"outline"}
                className="w-full"
                >
                  Print
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {supplier ? (
                <DropdownMenuItem>
                  <Button 
                  type="button" 
                  onClick={deleteOrder} 
                  variant={"outline"}
                  className="w-full bg-red-300"
                  >
                    Cancel
                  </Button>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Button 
                  type="button" 
                  onClick={deleteOrder} 
                  variant={"outline"}
                  className="w-full bg-red-300"
                  >
                    Delete
                  </Button>
                </DropdownMenuItem>
              )}
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>

          <ul className="grid gap-3">
            {orderItemsArray ?
              orderItemsArray.map((orderItem) => 
              <DocketItem orderItem={orderItem} />
              ) : "Order Items" }
          </ul>

          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Unique Items</span>
              {/** Calculate Num of Items */}
              <span>{orderItemsArray.length}</span>
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
        <Separator className="my-4" />
        <div>
          <ul>
          <li className="flex flex-col items-left font-semibold">
            <p className="text-muted-foreground">Notes</p>
          </li>
          <li className="flex flex-col items-left">
            <p className="text-muted-foreground">{order ? order.notes : "Loading Notes..."}</p>
          </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{restaurantData ? restaurantData.address1 : "Address 1"}</span>
              <span>{restaurantData ? 
                `${restaurantData.city}, ${restaurantData.state} ${restaurantData.postcode}` 
                : "Address 2"}
              </span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Restaurant Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd>{restaurantData ? restaurantData.name : "Name"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">{restaurantData ? restaurantData.email : "Email"}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">{restaurantData ? restaurantData.phone : "Phone"}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Supplier Information</div>
          <dl className="grid gap-3">
            {order ?
              order.supplierId ?
              <>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd>{supplierData ? supplierData.name : "Supplier Name"}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">{supplierData ? supplierData.email : "Supplier Email"}</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a href="tel:">{supplierData ? supplierData.phone : "Supplier Phone"}</a>
                  </dd>
                </div> 
              </>
              : <p className="text-red-500">No supplier has accepted this order yet</p>
            : "Loading supplier information..."}
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          <p>Created at: {new Date(order ? order.createdAt : "Loading Order Creation Date").toLocaleDateString()}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
