/**
 * Route API file for individual orders
 * to find restaurant data
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id } = await request.json(); //restaurant id
  try {
    // Fetch all assocatiated restaurant data
    const restaurantData = await prisma.restaurant.findUnique({ where: { id }})
    return NextResponse.json(restaurantData);

  } catch (error) {
    console.error('Error fetching order:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}