"use client";

import { useEffect, useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import SearchProducts, { ProductWithVolume } from './searchproducts';
import { Calendar } from "@/components/ui/calendar";
import Link from 'next/link';

export default function OrderForm() {
  // State functions
  const [step, setStep] = useState<number>(1); //control stage of form
  const [formData, setFormData] = useState<{
    orderDate: string;
    notes: string;
  }>({
    orderDate: '',
    notes: '',
  });
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [products, setProducts] = useState<ProductWithVolume[]>([]);

  //Get restaurant information (id) from session data
  const isLoggedIn = {
    id: 1
  }


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


  //Function to handle par level input
  const setDataParLevel = async () => {
    //Make the data in the setState functions that same as par levels
    try {
      //Get par levels
      const response = await fetch('/api/parlevels')
      if (response.ok) {
        const parlevelitems = await response.json();
        if (parlevelitems) {
          setProducts(parlevelitems)
        }
      } 
            
    } catch (error) {
      console.error("Error retrieving par levels: ", error)
    }
  }

  //Function to handle previous order input
  const setDataPreviousOrder = async () => {
    //Make the data in the setState functions the same as the previous order
    try {
      const response = await fetch('/api/prevorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: isLoggedIn.id }),  // Passing `id` as a JSON object
      });

      if (response.ok) {
        const prevorderitems = await response.json();
        if (prevorderitems) {
          setProducts(prevorderitems)
        }
      }
    } catch (error) {
      console.error("Error retrieving prev order: ", error)
    }
  }

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

    console.log(products)

    try {
      const response = await fetch('/api/createorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order created successfully!');
      } else {
        alert('Failed to create order!');
      }
    } catch (error) {
      console.error('Error creating order:', error);
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
                onClick={setDataParLevel}
                className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100'
              >
                Par Levels
              </button>
              <button
                type="button"
                onClick={setDataPreviousOrder}
                className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100'
              >
                Past Order
              </button>
            </div>

            <hr />

            {/* SearchProducts Component */}
            <div className='pt-6'>
              <SearchProducts products={products} setProducts={setProducts} />

              <div className='flex flex-row justify-end p-4'>
                <Button type="button" variant={'default'} onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>

            {/* Button for next step */}
            {/* <div className='relative w-full h-full pt-24'>
              <div className='flex flex-row justify-end absolute bottom-0 right-0'>
                <Button type="button" variant={'default'} onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div> */}
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
                  <div className="flex flex-row items-center md:items-start w-full">
                    {/* Date Section */}
                    <div className="px-10 ">
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
                      <div className="">
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
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-bold text-center p-10">Order Submitted</h2>
            <h4 className="text-md font-medium mb-2 p-4">We will notify you when the order is accepted by a supplier</h4>
            <Link href="./orders">
              <Button type="button" variant={'outline'}>
                View Orders
              </Button>
            </Link>
          </div>
        )}
      </form>
    </main>
  );
}



