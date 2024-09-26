import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get a cookie value by its name

export function getCookie(name: string): string | null {
  // Client-side, use 'document.cookie'
  if (typeof document !== 'undefined') {
    const cookiesArray = document.cookie.split('; ');
    const cookie = cookiesArray.find((cookie) => cookie.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  }
  
  return null; // Return null on the server
}

