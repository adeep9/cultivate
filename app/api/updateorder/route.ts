/**
 * Route API for restaurants to update existing orders
 */
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma is initialized in a separate file

export async function PUT(request: Request) {
  const { orderId, orderInfo, products, restaurantId } = await request.json();

  const { orderDate, notes } = orderInfo;

  // Convert string date to ISO DateTime
  const dueDateWithTime = String(orderDate) + 'T00:00:00Z'; // Append time in UTC
  const dueDateUTC = new Date(dueDateWithTime);
  const isoDateTime = dueDateUTC.toISOString();

  // Check if data is valid
  if (!orderId || !orderInfo || !products) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    // Update the order
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        restaurantId,
        notes: notes,
        dateDue: isoDateTime,
        items: {
          deleteMany: {}, // Deletes all existing items for this order before adding new ones
          create: products.map((item: any) => ({
            itemId: item.id,
            quantity: item.volume,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(updatedOrder, { status: 200 });

  } catch (error) {
    console.error('Error updating order:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Error updating order: ' + error }, { status: 500 });
  }
}

