/**
 * Route API file from either individual orders or orders page
 * for the SUPPLIER. 
 * Suppliers fulfilling order
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id, status } = await request.json(); // Expecting supplier ID and new status in request body

    try {
        // Update the status of the supplier with the given ID
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status }, // Updating the status field
        });

        return NextResponse.json(updatedOrder); // Return the updated supplier data

    } catch (error) {
        console.error('Error updating supplier status:', error); // Log the error to debug
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
