// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Assuming prisma is initialized in a separate file

export async function POST(request: Request) {
  const { email, phone, name, password, userType } = await request.json();

  if (!email || !password || !name || !phone) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (userType === 'restaurant') {
      await prisma.restaurant.create({
        data: { email, phone, name, password: hashedPassword },
      });
    } else if (userType === 'supplier') {
      await prisma.supplier.create({
        data: { email, phone, name, password: hashedPassword },
      });
    }
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'User already exists' }, { status: 500 });
  }
}
