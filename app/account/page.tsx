// Import necessary libraries and components
import React from 'react';
import { Dualbar } from '../components/restaurantcomponents/dualbar';

const AccountPage = () => {
  return (
    <div className="w-full h-screen bg-goated flex flex-col md:flex-row">

      <Dualbar />

      <div className="hidden md:block p-6 flex-col justify-start w-full">
        <p className="text-2xl text-black tracking-tight font-medium mb-4 mt-2 translate-x-1">
          Account
        </p>
        <hr className="border-t border-gray-300 w-full translate-y-[1px]" />
      </div>
    </div>
  );
};

export default AccountPage;