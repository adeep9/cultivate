"use client";

import React, { useState } from "react";
import "../styles/survey.css";

const SurveyForm = () => {
  // State to keep track of the current step
  const [step, setStep] = useState(1);

  // Empty State for form data
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
      submitCSVData(file); // Call the function to submit the CSV file
    }
  };

  // Handle next step
  const handleNext = () => {
    // When moving to the next step, check if it's the last step and submit the data
    if (step === 2 && formData.userType === "restaurant") {
      submitRestaurantData();
    } else if (step === 2 && formData.userType === "supplier") {
      submitSupplierData();
    }
    setStep(step + 1);
  };

  // Function to submit restaurant data
  const submitRestaurantData = async () => {
    try {
      const response = await fetch("/api/submitRestaurant", {  // Replace with your backend endpoint, this is where the information will go
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantName: formData.restaurantName,
          restaurantAddress: formData.restaurantAddress,
        }),
      });

      if (response.ok) {
        console.log("Restaurant data submitted successfully.");
      } else {
        console.error("Failed to submit restaurant data.");
      }
    } catch (error) {
      console.error("Error submitting restaurant data:", error);
    }
  };

  // Function to submit supplier data
  const submitSupplierData = async () => {
    try {
      const response = await fetch("/api/submitSupplier", {  // Replace with your backend endpoint, this is where the information will go
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierName: formData.supplierName,
          supplierAddress: formData.supplierAddress,
        }),
      });

      if (response.ok) {
        console.log("Supplier data submitted successfully.");
      } else {
        console.error("Failed to submit supplier data.");
      }
    } catch (error) {
      console.error("Error submitting supplier data:", error);
    }
  };

  // Function to submit CSV data
  const submitCSVData = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/submitCSV", {  // Replace with your backend endpoint, this is where the information will go
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("CSV file submitted successfully.");
      } else {
        console.error("Failed to submit CSV file.");
      }
    } catch (error) {
      console.error("Error submitting CSV file:", error);
    }
  };

  // Conditionally render form steps
  return (
    //Ask the user if they are a resteraunt or a supplier, to esnure what type of user this is. 
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
                className="p-2 border border-gray-300 rounded-md w-full"
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
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && formData.userType === "supplier" && (
        <div className="space-y-6 animate-fade-in">
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
        <div className="space-y-4 animate-fade-in">
          <p className="pb-2 text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-800 to-sky-700 bg-clip-text text-transparent">
            Upload and submit a CSV file
          </p>

          {/* File Upload Input */}
          <div className="flex flex-col items-start space-y-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block h-24 w-full text-sm text-gray-700 border-2 border-dashed border-blue-300 rounded-md p-2 cursor-pointer hover:bg-blue-200/30 transition"
            />

            {/* Submit Button */}
            <button
              onClick={() => console.log("Submitted CSV file!")}
              className="px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;

