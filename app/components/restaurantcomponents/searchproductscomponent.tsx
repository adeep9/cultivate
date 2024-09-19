"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import Popup from './searchpopupcontainer';

interface ProductTableRowProps {
  productCode: string;
  removeVariant: (productCode: string) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({ productCode, removeVariant }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRemove = () => {
    removeVariant(productCode); // This should only remove the current row
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <button type="button"
            className="font-semibold bg-transparent p-1 rounded-md hover:point hover:bg-gray-200"
            onClick={togglePopup}
          >
            {productCode}
          </button>
        </TableCell>
        <TableCell>
          <div className="h-9 w-full bg-gray-100 rounded-md border border-gray-200" />
        </TableCell>
        <TableCell>
          <Input id={`${productCode}-volume`} type="number" defaultValue="99.99" />
        </TableCell>
        <TableCell className="relative">
          <div className="h-9 w-full bg-gray-100 rounded-md border border-gray-200" />
          <button
            onClick={handleRemove}
            className="absolute top-0 right-0 m-1 text-white p-1 -translate-y-1"
            style={{ width: '1rem', height: '1rem' }}
          >
            <X className="w-3 h-3 bg-black rounded-full" />
          </button>
        </TableCell>
      </TableRow>

      {/* Popup Component */}
      <Popup
        isOpen={isPopupOpen}
        togglePopup={togglePopup}
        title={`${productCode} Details`}
        content={`This is the content inside the popup for ${productCode}.`}
      />
    </>
  );
};

export default ProductTableRow;




