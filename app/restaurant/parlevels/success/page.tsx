"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dualbar } from '@/app/components/suppliercomponents/DualBar';

const CreateParSuccessPage = () => {
  const router = useRouter();

  const handleGoToParLevels = () => {
    router.push('/restaurant/parlevels');
  };

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
            Par Level Created Successfully
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        {/* Bottom Section with Success Message and Button */}
        <div className="w-full max-h-full mt-10 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="text-center">
            <p className="text-xl mb-6 font-semibold">Your Par Levels have now been added to your account!</p>
            <p className="text-lg mb-1">You can now use these as a editable baseline for orders</p>
            <p className="text-lg mb-6">To view your new par levels, click the link below</p>
            <button
              onClick={handleGoToParLevels}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View Par Levels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParSuccessPage;
