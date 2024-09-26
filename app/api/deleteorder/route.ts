/**
 * API Route for deleting a specific order depending on id
 * This is called by individual order page ONLY
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id } = await request.json();
  try {
    //Find corresponding order
    const order = await prisma.order.findUnique({ where: { id }})

    if (order) { //check if order exists
        //delete dependent order items first
        await prisma.orderItem.deleteMany({
            where: { orderId: id }
        });

        //finally delete the order
        await prisma.order.delete({ where: { id }})

        return NextResponse.json({success: false});
    } else
    return NextResponse.json({success: false});

  } catch (error) {
    console.error('Error fetching order:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}