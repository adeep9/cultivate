"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <main>
      <div
        className="w-full h-20 bg-white p-4 flex items-center justify-between"
        style={{
          borderBottom: '1px solid #C9C9C9', // Adds a 1px bottom border with the color #C9C9C9
        }}
      >
        <button className="h-12 w-12 bg-gray-50 rounded-md border-[1.5px] border-gray-300 hover:bg-slate-200">
          {/* Button Content (if any) */}
        </button>
        <Avatar className="">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </main>
  );
}


