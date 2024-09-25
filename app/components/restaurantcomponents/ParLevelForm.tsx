"use client";

import { useEffect, useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import SearchProducts, { ProductWithVolume } from './searchproducts';
import { useRouter } from 'next/navigation';

interface ParLevelFormProps {
    id: number;
}

export default function ParLevelForm({id}: ParLevelFormProps) {
  // State functions
  const [products, setProducts] = useState<ProductWithVolume[]>([]);
  const [clearLoading, setClearLoading] = useState(false)
  const [currentLoading, setCurrentLoading] = useState(false)
  const [exists, setExists] = useState(false) //old par levels exist?

  const router = useRouter();

  //Function to handle form clearing
  const clearParLevel = () => {
    setClearLoading(true)
    try {
      setProducts([])
    } catch (error) {
      console.error("Error clearing par level: ", error)
    } finally {
      setClearLoading(false)
    }
  }

  //
  //Function to handle par level input
  const setProductsCurrentPar = async () => {
    setCurrentLoading(true)
    //Make the data in the setState functions that same as par levels
    try {
      //Get par levels
      const response = await fetch('/api/parlevels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        })
      });

      if (response.ok) {
        const parlevelitems = await response.json();
        if (parlevelitems) {
          setExists(true)
          setProducts(parlevelitems)
        } else {
          alert('No Par Levels');
        }
      }             
    } catch (error) {
      console.error("Error retrieving par levels: ", error)
    } finally {
      setCurrentLoading(false)
    }
  }

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/createupdateparlevel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: id,
          exists: exists,
          products: products
        }),
      });

      if (response.ok) {
        alert('Par Level Created Successfully!');
        router.push('success')
      } else {
        alert('Failed to Create Par Level!');
      }

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <main className="w-full h-full min-w-[400px] p-8 bg-white rounded-xl border border-gray-300">
      <form onSubmit={handleSubmit}>
          <div>
            {/* Header section */}
            <div className='flex flex-row justify-between'>
              <h2 className='tracking-tight font-medium text-3xl'>Par Level Item Selector</h2>
              <div className='w-32 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center'>
                <h3 className='tracking-tight font-medium text-gray-400'>ALPHA V1.0</h3>
              </div>
            </div>

            {/* Clear Button */}
            <div className='flex flex-row pt-8 gap-4 pb-6'>
                {clearLoading ? (
                  <button
                    type="button"
                    onClick={clearParLevel}
                    disabled
                    className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100'
                  >
                    <div className="flex flex-row">
                      <div className="loader"/>
                      <p className="pl-3">Clear</p>
                    </div>
                  </button>
                  
                ) : (
                  <button
                    type="button"
                    onClick={clearParLevel}
                    className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100'
                  >
                    <p className="">Clear</p>
                  </button>
                )}
                {currentLoading ? (
                  <button
                    type="button"
                    onClick={setProductsCurrentPar}
                    disabled
                    className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100'
                  >
                    <div className="flex flex-row">
                      <div className="loader"/>
                      <p className="pl-3">Current</p>
                    </div>
                  </button>
                  
                ) : (
                  <button
                    type="button"
                    onClick={setProductsCurrentPar}
                    className='h-10 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 tracking-tighter hover:bg-gray-100'
                  >
                    <p className="">Current</p>
                  </button>
                )}
            </div>
            <hr />
            {/* SearchProducts Component */}
            <div className='pt-6'>
              <SearchProducts products={products} setProducts={setProducts} parLevel={true}/>
              <div className='flex flex-row justify-end p-4'>
                <Button type="submit" variant={'default'}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
      </form>
    </main>
  );
}



