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
        <div>
          <p>What is your Restaurant name and Address?</p>
          <input
            type="text"
            name="restaurantName"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="restaurantAddress"
            placeholder="Restaurant Address"
            value={formData.restaurantAddress}
            onChange={handleChange}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && formData.userType === "supplier" && (
        <div>
          <p>Supplier name and address:</p>
          <input
            type="text"
            name="supplierName"
            placeholder="Supplier Name"
            value={formData.supplierName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="supplierAddress"
            placeholder="Supplier Address"
            value={formData.supplierAddress}
            onChange={handleChange}
          />
          <button onClick={handleNext}>Submit</button>
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
