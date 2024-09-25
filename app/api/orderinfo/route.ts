/**
 * API Route for getting an inidividual order from database using ID
 * Called by edit order page. Only takes notes and due date
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id } = await request.json();
  try {
    // Fetch singular order and its notes and dateDue
    const orderData = await prisma.order.findUnique({ 
        where: { id },
        select: {
            notes: true,
            dateDue: true,
        }
    })
    return NextResponse.json(orderData);

  } catch (error) {
    console.error('Error fetching order:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}