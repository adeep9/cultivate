"use client";

import React, { useState } from "react";
import "../styles/survey.css";

const SurveyForm = () => {
  // State to keep track of the current step
  const [step, setStep] = useState(1);

  // State for form data
  const [formData, setFormData] = useState({
    userType: "",
    restaurantName: "",
    restaurantAddress: "",
    supplierName: "",
    supplierAddress: "",
  });

  // Handle changes in form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload (CSV file)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log("Uploaded file:", file); // You can handle file upload logic here
    }
  };

  // Handle next step
  const handleNext = () => {
    setStep(step + 1);
  };

  // Conditionally render form steps
  return (
      <div>
        {step === 1 && (
          <div className="space-y-8 fade-in">
            <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">Are you a restaurant or a supplier?</p>
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
            htmlFor="restaurantName"
            className="block text-left text-sm font-medium text-gray-700 mb-1"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurantName"
            name="restaurantName"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full" // Example Tailwind styles for input
          />
        </div>

        {/* Restaurant Address Input */}
        <div>
          <label
            htmlFor="restaurantAddress"
            className="block text-left text-sm font-medium text-gray-700 mb-1"
          >
            Restaurant Address
          </label>
          <input
            type="text"
            id="restaurantAddress"
            name="restaurantAddress"
            placeholder="Restaurant Address"
            value={formData.restaurantAddress}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full" // Example Tailwind styles for input
          />
        </div>
      </div>


          <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Next
          </button>
        </div>
      )}

      {step === 2 && formData.userType === "supplier" && (
        <div className="space-y-6 animate-fade-in"> {/* Matching container styling */}
          <p className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
            Just one more step...
          </p>

          {/* Supplier Name Input */}
          <div>
            <label
              htmlFor="supplierName"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Supplier Name
            </label>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              placeholder="Supplier Name"
              value={formData.supplierName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Supplier Address Input */}
          <div>
            <label
              htmlFor="supplierAddress"
              className="block text-left text-sm font-medium text-gray-700 mb-1"
            >
              Supplier Address
            </label>
            <input
              type="text"
              id="supplierAddress"
              name="supplierAddress"
              placeholder="Supplier Address"
              value={formData.supplierAddress}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      )}


      {step === 3 && formData.userType === "restaurant" && (
        <div>
          <p>Upload and submit a CSV file:</p>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          <button onClick={() => console.log("Submitted CSV file!")}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
