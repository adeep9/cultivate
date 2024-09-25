"use client";

import React from 'react';

interface PopupProps {
  isOpen: boolean;
  togglePopup: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, togglePopup, children }) => {
  if (!isOpen) return null;

  return (
    <div className="min-w-[250px] fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {children}
        <button onClick={togglePopup} className="px-4 bg-red-500 text-white rounded-md mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;





