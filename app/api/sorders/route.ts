/**
 * Route API file for restaurants 
 * to see all of their orders
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { id } = await request.json();
  const supplierId = id; 

  try {
    // Fetch all orders for the restaurant
    const orders = await prisma.order.findMany({
      where: {
        supplierId: supplierId,
      },
      include: {
        items: {
          include: {
            item: true, // Include item details (name, price, etc.)
          },
        },
        restaurant: true, // Include restaurant details if needed
        supplier: true,   // Include supplier details if needed
      },
    });

    // Return the orders as JSON
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
