/**
 * API Route for getting the previous order by a particular restaurant
 * Called by individual order pages
 * This just reduces the amount of info in the url bar
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id } = await request.json();
  try {
    // Fetch all unique items based on the 'name', returning both 'name' and 'price'
    const orderData = await prisma.order.findUnique({ where: { id }})
    return NextResponse.json(orderData);

  } catch (error) {
    console.error('Error fetching order:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}