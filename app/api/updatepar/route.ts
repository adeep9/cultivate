/**
 * Route API for creating par levels for Restaurants
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming prisma is initialized in a separate file

export async function POST(request: Request) {
  const { orderInfo, products } = await request.json();
  console.log(orderInfo)
  console.log(products)

  //dont currently include orderInfo
  //currently adding restaurantId and supplierId manually
  const restaurantId = 1;
  const supplierId = 1;
  
  //Check if data is valid
  if (!orderInfo || !products) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
      const newOrder = await prisma.order.create({
        data: {
          restaurantId,
          supplierId,  // Can be null
          status: 'Pending',  // Default order status
          items: {
            create: products.map((item: any) => ({
              itemId: item.id,
              quantity: item.volume,
            })),
          },
        },
        include: { items: true },
      });
  
      return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {

    return NextResponse.json({ error: 'Error creating order: ' }, { status: 500 });

  }
}
