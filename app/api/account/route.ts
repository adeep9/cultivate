/**
 * Route for getting all the account information of a user
 * Both supplier and restaurant depending on userType
 * This is called by the account widget in the DualBar
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id, type } = await request.json();
  try {
    // Find user info depending on type
    if (type === "restaurant") {
        const user = await prisma.restaurant.findUnique({ 
            where: { id },
            select: {
                email: true,
                name: true,
                phone: true,
                address1: true,
                city: true,
                postcode: true,
                country: true,
            }
        })
        return NextResponse.json(user);
    } else {
        const user = await prisma.supplier.findUnique({ where: { id }})
        return NextResponse.json(user);
    }
    
  } catch (error) {
    console.error('Error fetching order:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}