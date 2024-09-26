'use client';

import Docket from '@/app/components/restaurantcomponents/docket';
import { SupplierDualbar } from '@/app/components/suppliercomponents/DualBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const IndividualOrder = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const orderId = Number(id);

  return (
    <div className="w-full h-screen bg-goated flex flex-col md:flex-row">
      {/* Sidebar Component */}
      <SupplierDualbar />
      {/* Main Content Area for All Screens */}
      <div className="orders-page flex flex-col justify-start w-full p-6">
        {/* Title and Horizontal Line (Visible on Medium and Larger Screens) */}
        <div className="hidden md:flex flex-col w-full">
          {/* Hidden on small screens, visible on md and larger */}
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl text-black tracking-tight font-medium mb-4 mt-2 translate-x-1">
              Individual Order
            </p>
            <Link href="/restaurant/orders">
              <Button type="button" variant={'outline'}>Back</Button>
            </Link>
          </div>
          
          <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
          <div className="mt-4">
            <Docket orderId={orderId} supplier={true}/>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default IndividualOrder;
