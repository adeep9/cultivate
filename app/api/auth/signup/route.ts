// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Assuming prisma is initialized in a separate file

interface signUpDataProps {
  email: string;
  phone: string;
  name: string;
  password: string;
  address1: string;
  city: string;
  postcode: string;
  state: string;
  country: string;
  supplierType: string;
}

export async function POST(request: Request) {
  const {
    email,
    phone,
    name,
    password,
    address1,
    city,
    postcode,
    state,
    country,
    supplierType,
  }: signUpDataProps = await request.json();
  
  //Trim the inputs to get rid of white spaces
  const trimmedEmail = email.trim();
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const trimmedPassword = password.trim();
  const trimmedAddress1 = address1.trim();
  const trimmedCity = city.trim();
  const trimmedPostcode = postcode.trim();
  const trimmedState = state.trim();
  const trimmedCountry = country.trim();

  //Hash the password
  const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

  // Check if email or phone number already exists
  const emailExists = await prisma.restaurant.findUnique({ where: { email: trimmedEmail } }) 
  || await prisma.supplier.findUnique({ where: { email: trimmedEmail } });

  const phoneExists = await prisma.restaurant.findUnique({ where: { phone: trimmedPhone } }) 
    || await prisma.supplier.findUnique({ where: { phone: trimmedPhone } });

  if (emailExists) {
  return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
  }

  if (phoneExists) {
  return NextResponse.json({ error: 'Phone number already in use' }, { status: 400 });
  }

  //Actually create users
  try {
    //Supplier 
    if (supplierType === "y") {
      await prisma.supplier.create({
        data: { 
          email: trimmedEmail, 
          phone: trimmedPhone, 
          name: trimmedName, 
          password: hashedPassword,
          address1: trimmedAddress1,  // Example - make sure these come from the signup form or default values
          city: trimmedCity,
          state: trimmedState,
          postcode: Number(trimmedPostcode),
          country: trimmedCountry,
          loggedInLast: new Date(),
        },
      });
    } else { //Restaurant
      await prisma.restaurant.create({
        data: { 
          email: trimmedEmail, 
          phone: trimmedPhone, 
          name: trimmedName, 
          password: hashedPassword,
          address1: trimmedAddress1,  // Example - make sure these come from the signup form or default values
          city: trimmedCity,
          state: trimmedState,
          postcode: Number(trimmedPostcode),
          country: trimmedCountry,
          loggedInLast: new Date(),
        },
      });
    }
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user: '}, { status: 400 });
  }
}
