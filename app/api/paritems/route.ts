/**
 * API Route for getting all items in a par level
 * Called by par level docket
 * 
 * Par level items need to be an object array with
 * item id, item name, item price, quantity
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Princess_Sofia } from '@next/font/google';

export async function POST(request: Request) {
    const { id } = await request.json(); //par level id
  try {
    // Fetch itemId and quantity
    const parLevelItems = await prisma.parLevelItem.findMany({ 
        where: { parLevelId: id },
        select: {
            itemId: true,
            quantity: true,
        }
    })

    const parLevelItemsArray: any = []

    for (const item of parLevelItems) {
        const itemInfo = await prisma.item.findUnique({ 
            where: { id: item.itemId },
            select: {
                name: true,
                price: true,
            }
        })

        parLevelItemsArray.push({
            ...itemInfo,
            id: item.itemId,
            quantity: item.quantity,
        })
    }

    return NextResponse.json(parLevelItemsArray);

  } catch (error) {
    console.error('Error fetching par level info:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}