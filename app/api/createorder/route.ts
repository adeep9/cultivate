/**
 * Route API for restaurants to create orders
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma is initialized in a separate file

export async function POST(request: Request) {
  const { orderInfo, products } = await request.json();

  const { orderDate, notes } = orderInfo

  //Convert string date to ISO DateTime
  const dueDateWithTime = String(orderDate) + 'T00:00:00Z'; // Append time in UTC
  const dueDateUTC = new Date(dueDateWithTime);
  const isoDateTime = dueDateUTC.toISOString();

  //Get restaurant info from session data
  const restaurantId = 1;
  
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
    console.log(error)
    return NextResponse.json({ error: 'Error creating order: ' }, { status: 500 });

  }
}
