"use client";

import React from "react";
import { Input } from "../components/ui/input"; // Adjust the import path as necessary

const Login = () => {
  return (
    <main className="relative z-20 h-[310px] w-[400px] bg-neutral-100 border-2 border-blue-600 rounded-[20px] p-6 shadow-lg">

      <h1 className="text-4xl font-bold mb-6 tracking-tight text-blue-600">Log In</h1>
      <form className="space-y-4">
        {/* Email Input Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1 text-left translate-x-[1px]"
          >
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full"
          />
        </div>

        {/* Password Input Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1 text-left translate-x-[1px]"
          >
            Password
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-gradient-to-tr from-blue-900 to-blue-600 text-white font-bold tracking-tight rounded-md hover:bg-blue-600 transition-colors"
        >
          Log In
        </button>
      </form>

    </main>
  );
};

export default Login;
