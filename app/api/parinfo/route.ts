/**
 * API Route for getting an information on a par level
 * 
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id } = await request.json(); //logged in restaurant id
  try {
    // Fetch all possible par levels (typically only 1) and their id and created at date
    const parLevelInfo = await prisma.parLevel.findMany({ 
        where: { restaurantId: id },
        select: {
            id: true,
            createdAt: true,
        }
    })
    return NextResponse.json(parLevelInfo);

  } catch (error) {
    console.error('Error fetching par level info:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}