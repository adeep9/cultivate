"use client";

import React from "react";
import Link from "next/link"; // Import Link from next/link for navigation
import { HeroHighlight } from "./components/ui/hero-highlight"; // Adjust the import path as necessary
import Signup from "./components/sign-up"; // Adjust the import path as necessary

const Page = () => {
  return (
    <HeroHighlight containerClassName="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <Signup />
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
    </HeroHighlight>
  );
};

export default Page;


