// components/AccountForm.tsx
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { AccountData } from '../suppliercomponents/DualBar';

const AccountInfo = ({accountData}: {accountData: AccountData}) => {
  //Deconstruct object
  const {
    email,
    phone,
    name,
    address1,
    city,
    state,
    postcode,
    country,
  } = accountData.accountInfo

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      {accountData.exists ? (
        accountData.accountType === "restaurant" ? (
          <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Restaurant Information</h2>
          <div className="space-y-3 text-gray-600">
            <p><span className="font-medium text-gray-700">Name:</span> {name}</p>
            <p><span className="font-medium text-gray-700">Email:</span> {email}</p>
            <p><span className="font-medium text-gray-700">Phone:</span> {phone}</p>
            <p>
              <span className="font-medium text-gray-700">Address:</span> {address1}, {city}, {state}, {postcode}, {country}
            </p>
          </div>
        </>
        ) : (
          <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Supplier Information</h2>
          <div className="space-y-3 text-gray-600">
            <p><span className="font-medium text-gray-700">Name:</span> {name}</p>
            <p><span className="font-medium text-gray-700">Email:</span> {email}</p>
            <p><span className="font-medium text-gray-700">Phone:</span> {phone}</p>
            <p>
              <span className="font-medium text-gray-700">Address:</span> {address1}, {city}, {state}, {postcode}, {country}
            </p>
          </div>
          <div className="flex flex-row">
            <Button variant={"secondary"} className="mt-5">
              <Link href="/">Logout</Link>
            </Button>
            <Button variant={"secondary"} className="mt-5 ml-2">
              <Link href="/">Switch Account</Link>
            </Button>
          </div>
          
        </>
        )
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Information</h2>
          <p><span className="font-medium text-gray-700">Could not be retrieved...</span></p>
          <Button variant={"outline"}>
            <Link href="/">Login</Link>
          </Button>
          <Button variant={"outline"}>
            <Link href="/">Sign Up</Link>
          </Button>
        </>
        
      )}
      
    </div>
  );
};

export default AccountInfo;

