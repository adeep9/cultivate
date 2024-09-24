// Import necessary libraries and components
import React from 'react';
import { Dualbar } from '../../components/restaurantcomponents/dualbar';
import CreateParLevel from '@/app/components/restaurantcomponents/createparlevel';



const ParLevelPage = () => {
  return (
    <div className="w-full h-screen bg-goated flex flex-col md:flex-row">
      {/* Sidebar Component */}
      <Dualbar />

      {/* Main Content Area for All Screens */}
      <div className="orders-page flex flex-col justify-start w-full p-6">
        {/* Title and Horizontal Line (Visible on Medium and Larger Screens) */}
        <div className="hidden md:flex flex-col w-full">
          {/* Hidden on small screens, visible on md and larger */}
          <p className="text-2xl text-black tracking-tight font-medium mb-4 mt-2 translate-x-1">
            Par Levels
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        <div className="pt-4">
          <div className="w-full h-full border bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-900 border-gray-300 rounded-xl p-1">
            <CreateParLevel/>
          </div>
        </div>

        <div className='pt-4'>
            Current Par Levels 
        </div>

      </div>
    </div>
  );
};

export default ParLevelPage;