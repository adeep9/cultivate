"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function Navbar() {
  // State to toggle navbar height
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the navbar height
  const toggleNavbarHeight = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <main>
      <div
        className={`w-full p-4 transition-all duration-300 ease-in-out bg-white relative ${
          isExpanded ? "h-[300px]" : "h-20"
        }`}
        style={{
          borderBottom: "1px solid #C9C9C9", // Adds a 1px bottom border with the color #C9C9C9
        }}
      >
        {/* Button with absolute positioning and adjusted top value */}
        <button
          onClick={toggleNavbarHeight} // Add onClick event handler
          className="h-11 w-11 bg-gray-50 rounded-md border-[1.5px] border-gray-300 hover:bg-slate-100 absolute left-4"
          style={{
            top: "1.2rem", // Move button up by 2rem
          }}
        ></button>

        {/* Avatar with absolute positioning and adjusted top value */}
        <Link href="/account">
            {/* Wrap Avatar with Link to navigate to /account */}
          <Avatar
            className="absolute right-4 cursor-pointer" // Added cursor-pointer for better UX
            style={{
              top: "1.2rem", // Position the avatar as required
            }}
          >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>

        {/* Conditionally rendered div only visible when the navbar is expanded */}
        {isExpanded && (
          <div className="p-6 h-48 mt-20">
            <p>
              <a href="/dashboard" className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline">
                Dashboard
              </a>
            </p>
            <p>
              <a href="/orders" className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline">
                Orders
              </a>
            </p>
            <p>
              <a href="/payments" className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline">
                Payments
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}


