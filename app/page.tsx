// page.tsx
"use client";

import React from "react";
import { HeroHighlight } from "./components/ui/hero-highlight"; // Adjust the import path as necessary
import { Button } from "./components/ui/button"; // 
import Signup from "./components/sign-up";

const Page = () => {
  return (
    <HeroHighlight containerClassName="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4">        
        <Signup/>
      </div>
    </HeroHighlight>
  );
};

export default Page;

