"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <Avatar
          className="absolute right-4"
          style={{
            top: "1.2rem", // Move avatar up by 2rem
          }}
        >
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Conditionally rendered div only visible when the navbar is expanded */}
        {isExpanded && (
          <div className="p-6 h-48 mt-20">
            <p>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline">
                Dashboard
              </a>
            </p>
            <p>
              <a href="https://www.another-example.com" target="_blank" rel="noopener noreferrer" className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline">
                Orders
              </a>
            </p>
            <p>
              <a href="https://www.more-info.com" target="_blank" rel="noopener noreferrer" className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline">
                Payments
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}


