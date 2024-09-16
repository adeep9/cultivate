// Import necessary libraries and components
import React from 'react';
import { Dualbar } from '../components/resterauntdashboard/dualbar';
import DeliveryPanel from '../components/resterauntdashboard/deliverypanel';
import Bids from '../components/resterauntdashboard/bids';
import Create from '../components/resterauntdashboard/createorder';
import CurrentOrder from '../components/resterauntdashboard/currentorder';
import OrderList from '../components/resterauntdashboard/orderlist';


const OrdersPage = () => {
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
            Orders
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        <div className="pt-4">
          <div className="w-full h-full border bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-900 border-gray-300 rounded-xl p-1">
            <Create />
          </div>
        </div>

        {/* Bottom Section Below the Line (Always Visible) */}
        <div className="w-full mt-4 flex flex-col md:flex-row gap-4">
          {/* Each Bids component will take equal space in a row format */}
          <Bids className="flex-1" />
          <DeliveryPanel className="flex-1" />
          <CurrentOrder className="flex-1"/>
        </div>

        <div className='pt-4'>
          <OrderList/>
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;