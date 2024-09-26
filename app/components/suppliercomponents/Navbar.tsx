"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger, // Import SheetTrigger from Sheet component
} from "@/components/ui/sheet"; // Ensure you have the correct path for the Sheet components
import AccountInfo from "../ui/AccountInfo"; // Ensure you have the correct path for AccountForm
import Link from "next/link"; 
import { AccountData } from "./DualBar";

export function Navbar({accountData}: {accountData: AccountData}) {
  // State to toggle navbar height
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the navbar height and icon
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
          className="h-11 w-11 bg-gray-50 rounded-md border-[1.5px] border-gray-300 hover:bg-slate-100 absolute left-4 flex items-center justify-center"
          style={{
            top: "1.2rem", // Move button up by 2rem
          }}
        >
          {/* Conditionally render the SVG icon based on expanded state */}
          <img
            src={isExpanded ? "/x.svg" : "/align-justify.svg"}
            alt="Icon"
            className="w-5 h-5"
          />
        </button>

        {/* Sheet and Avatar with absolute positioning and adjusted top value */}
        <Sheet>
          <SheetTrigger asChild>
            <Avatar
              className="absolute right-4 cursor-pointer" // Added cursor-pointer for better UX
              style={{
                top: "1.2rem", // Position the avatar as required
              }}
            >
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>

          {/* Sheet content that will be shown when the trigger is clicked */}
          <SheetContent>
            {/* Add additional content or components here */}
            <div className="p-4">
              <div>
                <AccountInfo accountData={accountData} />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Conditionally rendered div only visible when the navbar is expanded */}
        <div className="p-6 h-48 mt-20">
            {/* Menu Links */}
        {isExpanded && (
          accountData.accountType === "restaurant" ? (
            <>
              <p>
              <Link
                href="/restaurant/orders"
                className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline"
              >
                Orders
              </Link>
            </p>
            <p>
              <Link
                href="/restaurant/parlevels"
                className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline"
              >
                Par Levels
              </Link>
            <p>
            </p>
              <Link
                href="/restaurant/contact"
                className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline"
              >
                Contact
              </Link>
            </p>
            </>
          ) : (
            <>
            <p>
              <Link
                href="/supplier/orders"
                className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline"
              >
                Orders
              </Link>
            </p>
            <p>
              <Link
                href="/supplier/contact"
                className="pt-4 text-black text-2xl font-medium tracking-tight hover:underline"
              >
                Contact
              </Link>
            </p>
            </>
          )  
        )}
        </div>
      </div>
    </main>
  );
}




