"use client";

import React, { useState } from "react";
import { Input } from "../components/ui/input"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    userType: 'restaurant' // Assuming default userType
  });
  const [error, setError] = useState(''); // Single error state
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    if (!formData.email || !formData.phone || !formData.password) {
      return 'All fields must be filled';
    }
    if (formData.phone.length < 8 || formData.phone.length > 14) {
      return 'All fields must be valid';
    }
    return ''; // No errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault();
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Store data in session storage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('signupData', JSON.stringify(formData));
    }
    
    // Redirect to survey page
    setIsLoading(false)
    router.push('/survey');
  };

  return (
    <main className="relative z-20 h-[400px] w-[400px] bg-neutral-100 border-2 border-blue-600 rounded-[20px] p-6 shadow-lg">
      <h1 className="text-4xl font-bold mb-6 tracking-tight text-blue-600">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Phone Number Input Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1 text-left translate-x-[1px]"
          >
            Phone Number
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone" // Added name attribute
            placeholder="Enter your phone number"
            value={formData.phone} // Controlled input value
            onChange={handleChange} // Update state on change
            className="w-full"
          />
        </div>

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
            name="email" // Added name attribute
            placeholder="Enter your email"
            value={formData.email} // Controlled input value
            onChange={handleChange} // Update state on change
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
            name="password" // Added name attribute
            placeholder="Enter your password"
            value={formData.password} // Controlled input value
            onChange={handleChange} // Update state on change
            className="w-full"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-xs mt-1 text-center">
            {error}
          </p>
        )}

        {isLoading ? (
            <>
              <button
                disabled
                type="submit"
                className="w-full py-1 bg-gradient-to-tr from-blue-900 to-blue-600 text-white font-bold tracking-tight rounded-md hover:bg-blue-600 transition-colors z-10"
              >
                <div className="flex flex-row justify-center">
                  <div className="loader"/>
                  <div className="pl-2">Join Us</div>
                </div>
              </button>
            </>
          ) : (
            <>
            <button
              type="submit"
              className="w-full py-1 bg-gradient-to-tr from-blue-900 to-blue-600 text-white font-bold tracking-tight rounded-md hover:bg-blue-600 transition-colors z-10"
            >
              Join Us
            </button>
          </>
          )}
      </form>
    </main>
  );
};

export default Signup;

