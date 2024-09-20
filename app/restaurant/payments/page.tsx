// Import necessary libraries and components
import React from 'react';
import { Dualbar } from '../../components/restaurantcomponents/dualbar';
import Bids from '../../components/restaurantcomponents/activeorder';
import Billing from '../../components/restaurantcomponents/billing';
import Docket from '../../components/restaurantcomponents/docket';

const PaymentsPage = () => {
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
            Payments
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        {/* Main Content in a Single Column */}
        <div className="w-full mt-4 flex flex-col gap-4">
          {/* Bids and Billing in a row format */}
          <div className="flex flex-col md:flex-row gap-4">
            <Bids className="flex-1" />
            <Billing className="flex-1" />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Docket />
            <div className='w-full h-full bg-white border rounded-xl border-gray-800'>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;

