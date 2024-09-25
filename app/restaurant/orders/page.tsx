// Import necessary libraries and components
import { Dualbar } from '../../components/restaurantcomponents/dualbar';
import Create from '../../components/restaurantcomponents/createorder';
import OrderList from '../../components/restaurantcomponents/orderlist';
import ActiveOrders from '../../components/restaurantcomponents/activeorder';
import ParLevels from '../../components/restaurantcomponents/parlevels';
import PendingOrders from '../../components/restaurantcomponents/pendingorder';
import Link from 'next/link';

const OrdersPage = () => {

  //Find logged in restaurant info from session data
  const isLoggedIn = {
    id: 1
  }

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
          <ActiveOrders className="flex-1" id={isLoggedIn.id} />
          <Link href="parlevels"><ParLevels className="flex-1" id={isLoggedIn.id} /></Link>
          <PendingOrders className="flex-1" id={isLoggedIn.id} />
        </div>

        <div className='pt-4'>
          <OrderList id={isLoggedIn.id}/>
        </div>

      </div>
    </div>
  );
};

export default OrdersPage;