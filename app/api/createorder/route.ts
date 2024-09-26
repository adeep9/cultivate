/**
 * Route API for restaurants to create orders
 */
export const dynamic = "force-dynamic"

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma is initialized in a separate file

export async function POST(request: Request) {
  const { orderInfo, products, restaurantId } = await request.json();

  const { orderDate, notes } = orderInfo

  //Convert string date to ISO DateTime
  const dueDateWithTime = String(orderDate) + 'T00:00:00Z'; // Append time in UTC
  const dueDateUTC = new Date(dueDateWithTime);
  const isoDateTime = dueDateUTC.toISOString();
  
  //Check if data is valid
  if (!orderInfo || !products) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
      const newOrder = await prisma.order.create({
        data: {
          restaurantId,
          notes: notes,
          dateDue: isoDateTime,
          items: {
            create: products.map((item: any) => ({
              itemId: item.id,
              quantity: item.volume,
            })),
          },
        },
        include: { items: true },
      });
      console.log(newOrder)
      return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Error creating order: ' + error });
  };
}
