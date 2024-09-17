"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Ensure you import the Avatar components correctly
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger, // Import SheetTrigger from Sheet component
} from "@/components/ui/sheet";

import AccountForm from "./accountedit";

const AccountButton = () => {
  return (
    <Sheet>
      {/* Use SheetTrigger to open the Sheet */}
      <SheetTrigger asChild>
        {/* The trigger content (avatar and user details) */}
        <div className="pt-2 flex items-center border border-transparent hover:border-gray-200 rounded-md p-2 cursor-pointer transition-colors w-full text-left">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Name and Email */}
          <div className="ml-3">
            <p className="text-sm font-medium text-black tracking-tight">
              Adeep Mitra
            </p>
            <p className="text-xs text-gray-500">adeepmitr@gmail.com</p>
          </div>
        </div>
      </SheetTrigger>

      {/* Sheet content that will be shown when the trigger is clicked */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Account Information</SheetTitle>
          <SheetDescription>
            This is where the account details would go.
          </SheetDescription>
        </SheetHeader>
        {/* Add additional content or components here */}
        <div className="p-4">
          <div>
            <AccountForm />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountButton;




