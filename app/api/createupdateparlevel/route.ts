/**
 * Route API for restaurants to create or update par levels
 * Called by par create/ update form
 */
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma is initialized in a separate file

interface ParItem {
    id: number;
    name: string;
    price: number;
    unit: string;
    volume: number;
}

interface CreateUpdateParProps {
    restaurantId: number;
    exists: boolean;
    products: ParItem[]
}

export async function POST(request: Request) {
  const { restaurantId, exists, products }: CreateUpdateParProps = await request.json();

  try {
    if (exists) {
      // If par level already exists, update it
      const updatedParLevel = await prisma.parLevel.update({
        where: { id: restaurantId },
        data: {
          items: {
            deleteMany: {}, // Optional: clear previous items before adding new ones
            create: products.map((item: any) => ({
              itemId: item.id,
              quantity: item.volume, // Assuming `volume` is the quantity
            })),
          },
        },
        include: { items: true },
      });

      return NextResponse.json(updatedParLevel, { status: 200 });

    } else {
      // If par level doesn't exist, create a new one
      const newParLevel = await prisma.parLevel.create({
        data: {
          restaurantId,
          items: {
            create: products.map((item: any) => ({
              itemId: item.id,
              quantity: item.volume, // Assuming `volume` is the quantity
            })),
          },
        },
        include: { items: true },
      });

      return NextResponse.json(newParLevel, { status: 201 });
    }

  } catch (error) {
    console.error('Error creating/updating par level:', error); // Log the error for debugging
    return NextResponse.json({'Error creating/updating par level: ': error}, { status: 500 });
  }
}
