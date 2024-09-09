"use client";

import React from "react";
import { HeroHighlight } from "../components/ui/hero-highlight";
import Login from "../components/log-in";
import { Button } from "../components/ui/button"; // Adjust the import path as necessary
import Link from "next/link"; // Import Link from next/link

const LoginPage = () => {
  return (
    <HeroHighlight containerClassName="h-screen w-full flex items-center justify-center">
      <div className="text-center space-y-4">        
        <Login />
        <div>
          <Link href="/" passHref> 
            <Button variant="outline" size="sm" asChild>
              <span>return</span>
            </Button>
          </Link>
        </div>
      </div>
    </HeroHighlight>
  );
};

export default LoginPage;

