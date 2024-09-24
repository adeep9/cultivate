// app/api/items/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all unique items based on the 'name', returning both 'name' and 'price'
    const uniqueItems = await prisma.item.findMany({
      distinct: ['name'], // Ensure 'name' is unique
      select: {
        id: true,
        name: true,
        price: true, // Assuming 'price' is a field in the Item table
        unit: true,
      },
    });

    return NextResponse.json(uniqueItems);
  } catch (error) {
    console.error('Error fetching unique items:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

