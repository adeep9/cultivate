"use client";

import React from 'react';
import {DataTableDemo} from './seachpopup'

interface PopupProps {
  isOpen: boolean;
  togglePopup: () => void;
  title: string;
  content: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, togglePopup, title, content }) => {
  return (
    <>
      {isOpen && (
        <div className="min-w-[250px] fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <DataTableDemo/>
            <button onClick={togglePopup} className="px-4 py-2 bg-red-500 text-white rounded-md">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;


