// components/AccountForm.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input"; // Ensure you have the correct path for Input component
import { Button } from "@/components/ui/button"; // Ensure you have the correct path for Button component

const AccountForm: React.FC = () => {
  return (
    <form className="space-y-4">
      {/* Account Name */}
      <div>
        <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">
          Account Name
        </label>
        <Input type="text" id="accountName" placeholder="Enter your name" />
      </div>

      {/* Account Email */}
      <div>
        <label htmlFor="accountEmail" className="block text-sm font-medium text-gray-700">
          Account Email
        </label>
        <Input type="email" id="accountEmail" placeholder="Enter your email" />
      </div>

      {/* Account Phone Number */}
      <div>
        <label htmlFor="accountPhone" className="block text-sm font-medium text-gray-700">
          Account Phone Number
        </label>
        <Input type="tel" id="accountPhone" placeholder="Enter your phone number" />
      </div>

      {/* Account Password */}
      <div>
        <label htmlFor="accountPassword" className="block text-sm font-medium text-gray-700">
          Account Password
        </label>
        <Input type="password" id="accountPassword" placeholder="Enter your password" />
      </div>

      {/* Account Address */}
      <div>
        <label htmlFor="accountAddress" className="block text-sm font-medium text-gray-700">
          Account Address
        </label>
        <Input type="text" id="accountAddress" placeholder="Enter your address" />
      </div>

      {/* Submit Button */}
      <div>
        <Button type="submit" variant="default">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
