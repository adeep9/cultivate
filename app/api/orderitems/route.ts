/**
 * API Route for getting the list of items for an order
 * Called by the individual order page, as well as the 
 * create order from previous order function
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { id } = await request.json(); // Order ID
  try {
    // Fetch only itemId and quantity from the orderItem table where orderId matches the provided id
    const items = await prisma.orderItem.findMany({
      where: { orderId: id },  // Assuming you're matching orderId, not id of the item
      select: {
        itemId: true,  // Select itemId
        quantity: true,  // Select quantity
      },
    });

    console.log(items)

    const itemArray = [];

    for (const item of items) {
        //add 
        const itemsData = await prisma.item.findUnique({
            where: { id: item.itemId },
            select: {
                id: true,
                name: true,
                price: true,
                unit: true,
            }
        });

        //make final item object
        const finalItem = {
            ...itemsData,
            volume: item.quantity
        }

        //push to itemArray 
        itemArray.push(finalItem);
    }
    
    
    return NextResponse.json(itemArray);

  } catch (error) {
    console.error('Error fetching order items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
