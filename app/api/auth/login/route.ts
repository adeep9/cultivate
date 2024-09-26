// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  let supplierType = false;

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    // Check if the user exists in the restaurant table
    // If not found in the restaurant table, check the supplier table
    let user = await prisma.restaurant.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.supplier.findUnique({ where: { email } });
      supplierType = true;
    }
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    //Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    //create cookies token (that never expires)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {});

    const response = NextResponse.json({ 
      success: true,
      supplierType: supplierType
    });

    //Set user ID cookie
    response.cookies.set('userId', String(user.id), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    });

    //Set token cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    });

    //Set user type cookie
    let userType="restaurant"
    if (supplierType) {
      userType = "supplier"
    }
    response.cookies.set('userType', String(userType), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    });

    console.log("USER TYPE FROM ROUTE:", userType)
    return response;

  } catch (error) {
    console.error('Login error:', error); // Log the error to see details
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
