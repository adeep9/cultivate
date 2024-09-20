"use client";

import { useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import SearchProducts, { ProductWithVolume } from './searchproducts';
import { Calendar } from "@/components/ui/calendar";

export default function OrderForm() {
  // State to manage form steps and inputs
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<{
    orderDate: string;
    orderTime: string;
    notes: string;
  }>({
    orderDate: '',
    orderTime: '',
    notes: '',
  });

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // State for products
  const [products, setProducts] = useState<ProductWithVolume[]>([]);

  // Handle the date change from the calendar
  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormData((prevData) => ({
        ...prevData,
        orderDate: formattedDate,
      }));
      setDate(selectedDate);
    }
  };

  // Function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Keep date picker and input in sync
    if (name === "orderDate") {
      const selectedDate = new Date(value);
      setDate(selectedDate);
    }
  };

  // Function to go to the next step
  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  // Function to go to the previous step
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Combine formData and products to send to backend
    const orderData = {
      orderInfo: formData,
      products: products,
    };

    try {
      const response = await fetch('/api/orders/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      console.log('Order submitted:', result);

      // Advance to Step 4 after successful submission
      setStep(4);
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <main className="w-full h-full min-w-[400px] p-8 bg-white rounded-xl border border-gray-300">
      <form onSubmit={handleSubmit}>
        {/* Step 1: Item Selection */}
        {step === 1 && (
          <div>
            {/* Header section */}
            <div className='flex flex-row justify-between'>
              <h2 className='tracking-tight font-medium text-3xl'>Step 1</h2>
              <div className='w-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center'>
                <h3 className='tracking-tight font-medium text-gray-400'>Item Selection</h3>
              </div>
            </div>

            {/* Column of two buttons */}
            <div className='flex flex-row pt-8 gap-4 pb-6'>
              <button
                type="button"
                className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2'
              >
                Par Levels
              </button>
              <button
                type="button"
                className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2'
              >
                Past Order
              </button>
            </div>

            <hr />

            {/* SearchProducts Component */}
            <div className='pt-6'>
              <SearchProducts products={products} setProducts={setProducts} />
            </div>

            {/* Button for next step */}
            <div className='relative w-full h-full pt-24'>
              <div className='flex flex-row justify-end absolute bottom-0 right-0'>
                <Button type="button" variant={'default'} onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Date and Time */}
        {step === 2 && (
          <div>
            <div className='flex flex-row justify-between'>
              <h2 className='tracking-tight font-medium text-3xl'>Step 2</h2>
              <div className='w-40 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center'>
                <h3 className='tracking-tight font-medium text-gray-400'>Order Information</h3>
              </div>
            </div>

            {/* Date and Time Inputs */}
            <div className="pt-10 flex justify-center">
              <div className="flex flex-row w-full max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8 mx-auto">
                  {/* Date Section */}
                  <div className="flex flex-col items-center md:items-start w-full">
                    <h3 className="text-lg font-medium mb-2 text-center md:text-left">Select Date</h3>
                    <input
                      type="date"
                      name="orderDate"
                      className="h-8 w-full max-w-xs border bg-gray-50 rounded-md"
                      value={formData.orderDate}
                      onChange={handleChange}
                      required
                    />
                    {/* Calendar Component */}
                    <div className="pt-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        className="rounded-md border max-w-xs"
                      />
                    </div>
                  </div>

                  {/* Time and Notes Section */}
                  <div className="flex flex-col items-center md:items-start w-full">
                    <h3 className="text-lg font-medium mb-0 text-center md:text-left">Select Time</h3>
                    <div className="pt-2">
                      <input
                        type="time"
                        name="orderTime"
                        className="bg-slate-50 p-1 border h-8 border-gray-200 rounded-md w-48"
                        value={formData.orderTime}
                        onChange={handleChange}
                        required
                      />
                      <h3 className="text-lg font-medium pt-6 mb-2 text-center md:text-left">Additional Notes</h3>
                      <textarea
                        name="notes"
                        className="bg-slate-50 p-2 border border-gray-200 rounded-md w-48 h-24 resize-none"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Enter any additional notes here..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className='relative w-full h-full min-h-[100px]'>
              <Button type="button" variant={'outline'} onClick={handleBack} className="absolute bottom-0 left-0 p-4">
                Back
              </Button>
              <Button type="button" variant={'default'} onClick={handleNext} className="absolute bottom-0 right-0 p-4">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review and Submit */}
        {step === 3 && (
          <div>
            <div className='flex flex-row justify-between'>
              <h2 className='tracking-tight font-medium text-3xl'>Step 3</h2>
              <div className='w-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center'>
                <h3 className='tracking-tight font-medium text-gray-400'>Review Order</h3>
              </div>
            </div>

            {/* Display order summary */}
            <div className='pt-8 pb-16'>
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>

              {/* Products Table */}
              <SearchProducts products={products} setProducts={setProducts} readOnly={true} />

              {/* Display other form data */}
              <div className="mt-8">
                <h4 className="text-md font-medium mb-2">Order Information</h4>
                <div className="flex flex-col space-y-2">
                  <div>
                    <strong>Date:</strong> {formData.orderDate}
                  </div>
                  <div>
                    <strong>Time:</strong> {formData.orderTime}
                  </div>
                  <div>
                    <strong>Notes:</strong> {formData.notes || 'No additional notes.'}
                  </div>
                </div>
              </div>
            </div>

            <div className='relative w-full h-full pt-4'>
              <Button type="button" variant={'outline'} onClick={handleBack} className="absolute bottom-0 left-0 p-4">
                Back
              </Button>
              <Button type="submit" variant={'default'} className="absolute bottom-0 right-0 p-4">
                Submit
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Thank You Message */}
        {step === 4 && (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center">Thank you, order received</h2>
          </div>
        )}
      </form>
    </main>
  );
}



