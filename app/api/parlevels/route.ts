/**
 * API Route used for getting par level items of a specific restaurant
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ParLevel {
    id: number;
    restaurantId: number;
    createdAt: Date;
}

export async function POST(request: Request) {
    const { id } = await request.json();

    try {
        // Fetch all unique items based on the 'name', returning both 'name' and 'price'
        const parlevel = await prisma.parLevel.findMany({ where: {
            restaurantId: id,
        } })

        if (!parlevel[0].id) {
            throw new Error
        }

        //Find individual item data
        const parLevelItems = await prisma.parLevelItem.findMany({
            where: { parLevelId: parlevel[0].id }
        });

        // Initialize an array to hold the item data
        const parLevelItemsData = [];

        for (const item of parLevelItems) {
            // For each parLevelItem, find the corresponding item data
            const itemData = await prisma.item.findUnique({
                where: { id: item.itemId }  // Assuming parLevelItem has a reference to an Item model via itemId
            });

            // Push the item data to the array
            const modItemData = {
                ...itemData,
                volume: item.quantity
            }

            parLevelItemsData.push(modItemData)
        }

        // Return the array of item data as JSON response
        return NextResponse.json(parLevelItemsData);


    } catch (error) {
        console.error('Error fetching unique items:', error); // Log the error to debug
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
