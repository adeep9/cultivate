import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;
  const userTypeCookie = req.cookies.get('userType');
  const userType = userTypeCookie ? userTypeCookie.value : null; // Get userType from cookie

  // Redirect to login if no token is present
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the JWT token
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));

    // Define route access based on userType
    const urlPath = req.nextUrl.pathname;

    if (userType === 'supplier') {
      // Check if accessing supplier routes
      if (urlPath.startsWith('/restaurant')) {
        return NextResponse.redirect(new URL('/supplier/orders', req.url)); // Redirect unauthorized access
      }
    } else if (userType === 'restaurant') {
      // Check if accessing restaurant routes
      if (urlPath.startsWith('/supplier')) {
        return NextResponse.redirect(new URL('/restaurant/orders', req.url)); // Redirect unauthorized access
      }
    } else {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect for unknown user types
    }

    return NextResponse.next(); // Allow access if everything is valid
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define the config for matcher for all protected routes
export const config = {
  matcher: ['/supplier/:path*', '/restaurant/:path*'], // Adjust based on your routes
};
