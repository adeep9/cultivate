"use client";

import React from 'react';
import { Dualbar } from '@/app/components/restaurantcomponents/dualbar';

const Contact = () => {
  return (
    <div className="w-full h-screen bg-goated flex flex-col md:flex-row">
      {/* Sidebar Component */}
      <Dualbar />

      {/* Main Content Area for All Screens */}
      <div className="orders-page flex flex-col justify-start w-full p-6">
        {/* Title and Horizontal Line (Visible on Medium and Larger Screens) */}
        <div className="hidden md:flex flex-col w-full ">
          {/* Hidden on small screens, visible on md and larger */}
          <p className="text-2xl text-black tracking-tight font-medium mb-4 mt-2 translate-x-1">
            Contact
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        {/* Bottom Section with Success Message and Button */}
        <div className="w-full max-h-full mt-10 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="text-center">
            <p className="text-xl mb-6 font-semibold">We are here to help you!</p>
            <p className="text-lg mb-1">Phone: 0491 383 021</p>
            <p className="text-lg mb-6">Email: admin@polinate.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;