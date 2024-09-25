import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { id } = await request.json(); // restaurantId

    // Fetch the latest order by sorting by createdAt in descending order
    const latestOrder = await prisma.order.findFirst({
      where: { 
        restaurantId: id 
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order
      },
    });

    // Check if an order was found
    if (!latestOrder) {
      return NextResponse.json({ message: 'No orders found' }, { status: 404 });
    }

    // Return the orderId of the newest order
    return NextResponse.json({ orderId: latestOrder.id });

  } catch (error) {
    console.error('Error fetching order:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
