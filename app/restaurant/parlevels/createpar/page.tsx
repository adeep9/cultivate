"use client";

import React from 'react';
import { Dualbar } from '@/app/components/restaurantcomponents/dualbar';
import ParLevelForm from '@/app/components/restaurantcomponents/ParLevelForm';

const CreateParLevelPage = () => {
    //user info from session data
    const isLoggedIn = {
        id: 1
    }

    //find out if user has par level already
    //this is change the text and pass info
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
            Par Level Editor
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        {/* Bottom Section Below the Line (Always Visible) */}
        <div className="w-full max-h-full mt-4 flex flex-col md:flex-row gap-4">
          {/* Container for Orderform */}
          <div className="flex-1">
            <ParLevelForm id={isLoggedIn.id}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateParLevelPage;
