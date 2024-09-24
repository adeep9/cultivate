"use client";

import React from 'react';
import { Dualbar } from '../../components/restaurantcomponents/dualbar';
import Orderform from '../../components/restaurantcomponents/orderform';



const DashboardPage = () => {
  return (
    <div className="w-full h-screen bg-goated flex flex-col md:flex-row">
      {/* Sidebar Component */}
      <Dualbar />

      {/* Main Content Area for All Screens */}
      <div className="orders-page flex flex-col justify-start  w-full p-6">
        {/* Title and Horizontal Line (Visible on Medium and Larger Screens) */}
        <div className="hidden md:flex flex-col w-full ">
          {/* Hidden on small screens, visible on md and larger */}
          <p className="text-2xl text-black tracking-tight font-medium mb-4 mt-2 translate-x-1">
            Create Order
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        {/* Bottom Section Below the Line (Always Visible) */}
        <div className="w-full max-h-full mt-4 flex flex-col md:flex-row gap-4">
          {/* Container for Orderform */}
          <div className="flex-1">
            <Orderform />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;