"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../styles/survey.css";

interface FormData {
  [key: string]: string;
}

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});

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
    address: '',
  });

  const validate = () => {
    const newErrors = { name: '', address: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);

    // Return whether there are errors
    return Object.values(newErrors).some(error => error !== '');
  };

  const handleNext = async () => {
    if (step === 2) {
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
        } else if (res.status === 500) {
          // If error 500, redirect to /exists page
          router.push("/exists");
        } else {
          console.error("Failed to submit data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
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
                setFormData({ ...formData, userType: "restaurant" });
                handleNext();
              }}
            >
              Restaurant
            </button>
            <button
              className="btn-custom-s"
              onClick={() => {
                setFormData({ ...formData, userType: "supplier" });
                handleNext();
              }}
            >
              Supplier
            </button>
          </div>
        </div>
      )}

      {step === 2 && formData.userType === "restaurant" && (
        <div className="space-y-8 animate-fade-in">
          <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
            A few more questions...
          </p>
          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-left text-sm font-medium text-gray-700 mb-1"
              >
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Restaurant Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-left text-sm font-medium text-gray-700 mb-1"
              >
                Restaurant Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Restaurant Address"
                value={formData.address}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      )}

      {step === 2 && formData.userType === "supplier" && (
        <div className="space-y-6 animate-fade-in">
          <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
            Just one more step...
          </p>
          <div>
            <label
              htmlFor="name"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Supplier Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Supplier Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Supplier Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Supplier Address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
          </div>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
