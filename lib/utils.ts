import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to get a cookie value by its name
// Utility function to get a cookie value by its name
export function getCookie(name: string): string {
  // Check if we are in a browser environment
  if (typeof document === 'undefined') {
    console.warn('getCookie called in a non-browser environment; returning null.');
    return ""; // Return null if document is not defined (e.g., server-side)
  }

  // Split cookies into an array
  const cookies = document.cookie.split('; ');
  // Find the cookie with the given name
  const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));

  // Return the cookie value or null if not found
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : "";
}
