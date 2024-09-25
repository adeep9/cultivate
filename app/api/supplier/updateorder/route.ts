/**
 * Route API file from either individual orders or orders page
 * for the SUPPLIER. 
 * Suppliers can either accept, reject, fulfill and cancel orders
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { id } = await request.json(); //supplier ID
  try {
    // Find unique value for corresponding supplier ID
    const supplierData = await prisma.supplier.findUnique({ where: { id }})
    return NextResponse.json(supplierData);

  } catch (error) {
    console.error('Error fetching supplier data:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}