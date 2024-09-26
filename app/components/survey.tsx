"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../styles/survey.css";

//FormData will also include userType
interface FormData {
  [key: string]: string;
}

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Retrieve data from session storage
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem('signupData');
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []); // Empty dependency array to run this effect only once

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({
    name: '',
    address1: '',
    city: '',
    postcode: '',
    state: '',
    country: '',
  });

  const validate = () => {
    const newErrors = { 
    name: '',
    address1: '',
    city: '',
    postcode: '',
    state: '',
    country: '',
  };

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.address1) {
      newErrors.address1 = 'Address is required';
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    if (!formData.postcode) {
      newErrors.postcode = 'Postcode is required';
    }
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);

    // Return whether there are errors
    return Object.values(newErrors).some(error => error !== '');
  };

  const handleNext = async () => {
    if (step === 2) {
      setIsLoading(true)
      //Check for errors
      const hasErrors = validate();
      if (hasErrors) {
        return; // Don't proceed if there are errors
      }
  
      // Perform submission based on userType
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (res.ok) {
          router.push("/login");
        } else {
          console.error("Failed to create user!");
        }
      } catch (error) {
        console.error("An error occurred: ", error);
        alert("Error. Could not create account!")
      } finally {
        setIsLoading(false)
      }
    } else {
      setStep(step + 1);
    }
  };
  

  return (
    <div>
      {step === 1 && (
        <div className="space-y-8 fade-in">
          <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
            Are you a restaurant or a supplier?
          </p>
          <div className="flex space-x-6">
            <button
              className="btn-custom-r"
              onClick={() => {
                setFormData({ ...formData, supplierType:  "n"});
                handleNext();
              }}
            >
              Restaurant
            </button>
            <button
              className="btn-custom-s"
              onClick={() => {
                setFormData({ ...formData, supplierType: "y" });
                handleNext();
              }}
            >
              Supplier
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
            Just one more step...
          </p>
          <div>
            <label
              htmlFor="name"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Business Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Business Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            <label
              htmlFor="address1"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Address Line 1
            </label>
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="10 Example St, Suburb"
              value={formData.address1}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.address1 && <p className="text-red-600 text-xs mt-1">{errors.address1}</p>}
            <label
              htmlFor="city"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
            <label
              htmlFor="postcode"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              placeholder="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.postcode && <p className="text-red-600 text-xs mt-1">{errors.postcode}</p>}
            <label
              htmlFor="state"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
            <label
              htmlFor="country"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.country && <p className="text-red-600 text-xs mt-1">{errors.country}</p>}
          </div>
          {isLoading ? (
            <>
              
              <button
                onClick={handleNext}
                disabled
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition z-10"
              >
                <div className="flex flex-row">
                  <div className="loader"/>
                  <div className="pl-2">Submit</div>
                </div>
                
              </button>
            </>
          ) : (
            <>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition z-10"
            >
              Submit
            </button>
          </>
          )}
          
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
