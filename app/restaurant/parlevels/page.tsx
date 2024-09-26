"use client"

import ParLevelDocket from '@/app/components/restaurantcomponents/ParLevelDocket';
import { Dualbar } from '@/app/components/suppliercomponents/DualBar';
import { getCookie } from '@/lib/utils';
import CreateParLevel from '../../components/restaurantcomponents/CreateParLevel';


const ParLevelPage = () => {
  const userId: string = getCookie('userId'); //get userId from session
  const id = Number(userId)
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
          <div className="w-full h-full border bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-900 border-gray-300 rounded-xl p-1">
          <CreateParLevel/>
          </div>
        </div>

        <div className='pt-4'>
            <ParLevelDocket id={id} />
        </div>
      </div>
    </div>
  );
};

export default ParLevelPage;