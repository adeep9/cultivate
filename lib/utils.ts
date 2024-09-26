import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get a cookie value by its name
import { cookies } from 'next/headers'; // For server-side cookie access in Next.js

export function getCookie(name: string): string | null {
  // Check if we are in a server-side environment
  if (typeof document === 'undefined') {
    // Server-side, use 'next/headers' to access cookies
    const serverCookies = cookies();
    const cookie = serverCookies.get(name);
    return cookie ? cookie.value : null;
  }

  // Client-side, use 'document.cookie'
  const cookiesArray = document.cookie.split('; ');
  const cookie = cookiesArray.find((cookie) => cookie.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
}

