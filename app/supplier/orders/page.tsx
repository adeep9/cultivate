"use client"
// Import necessary libraries and components
import SupplierActiveOrders from '@/app/components/suppliercomponents/SupplierActiveOrders';
import { Dualbar } from '@/app/components/suppliercomponents/DualBar';
import SupplierOrderHeader from '@/app/components/suppliercomponents/SupplierOrderHeader';
import SupplierPendingOrders from '@/app/components/suppliercomponents/SupplierPendingOrders';
import SupplierOrderList from '@/app/components/suppliercomponents/SupplierOrderList';
import { getCookie } from '@/lib/utils';

const OrdersPage = () => {
  const userId: string | null = getCookie('userId'); //get userId from session
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
            Orders
          </p>
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
        </div>

        <div className="pt-4">
          <div className="w-full h-full border bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-900 border-gray-300 rounded-xl p-1">
            <SupplierOrderHeader id={id}/>
          </div>
        </div>

        {/* Bottom Section Below the Line (Always Visible) */}
        <div className="w-full mt-4 flex flex-col md:flex-row gap-4">
          {/* Each Bids component will take equal space in a row format */}
          <SupplierActiveOrders className="flex-1" id={id} />
          <SupplierPendingOrders className="flex-1" id={id} />
        </div>

        <div className='pt-4'>
          <SupplierOrderList id={id}/>
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;