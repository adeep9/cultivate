/**
 * API Route for getting numbe of active or pending
 * orders depending on request and id
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    const { type, id, supplier } = await request.json();
    
  try {
    // Fetch all orders according to restaurant id
    if (type === "pending") {
        if (supplier) {
            const orderData = await prisma.order.findMany({ 
                where: { 
                    supplierId: id,
                    status: 'Pending' 
                }, 
            });
            const orderNum = orderData.length
            return NextResponse.json(orderNum);
        } else {
            const orderData = await prisma.order.findMany({ 
                where: { 
                    restaurantId: id,
                    status: 'Pending' 
                }, 
            });
            const orderNum = orderData.length
            return NextResponse.json(orderNum);
        }
        
    } else { //active
        if (supplier) {
            const orderData = await prisma.order.findMany({ 
                where: { 
                    supplierId: id,
                    status: 'Active' 
                },
            }); 
            const orderNum = orderData.length
            return NextResponse.json(orderNum);
        } else {
            const orderData = await prisma.order.findMany({ 
                where: { 
                    restaurantId: id,
                    status: 'Active' 
                },
            }); 
            const orderNum = orderData.length
            return NextResponse.json(orderNum);
        } 
    }
  } catch (error) {
    console.error('Error fetching order:', error); // Log the error to debug
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}