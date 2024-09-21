"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";
import Popup from './searchpopupcontainer'; // Adjust the import path if necessary

import { ProductWithVolume } from './searchproducts'; // Import ProductWithVolume type

interface ProductTableRowProps {
  product: ProductWithVolume;
  removeProduct?: (productId: string) => void;
  updateProductVolume?: (productId: string, newVolume: number) => void;
  readOnly?: boolean;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  removeProduct,
  updateProductVolume,
  readOnly = false,
}) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);

  const togglePopup = () => {
    if (!readOnly) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const handleRemove = () => {
    if (removeProduct) {
      removeProduct(product.id); // Remove the current product
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value) || 0;
    if (updateProductVolume) {
      updateProductVolume(product.id, newVolume); // Update volume in parent component
    }
  };

  const totalPrice = product.price * product.volume;

  return (
    <>
      <TableRow>
        <TableCell className="relative">
          <div className="flex items-center">
            <button
              type="button"
              className="font-semibold bg-transparent p-1 rounded-md hover:bg-gray-200"
              onClick={togglePopup}
              disabled={readOnly}
            >
              {product.name}
            </button>
          </div>
        </TableCell>
        <TableCell>
          <Input
            className="bg-gray-100 text-center"
            id={`${product.id}-price`}
            type="number"
            value={product.price}
            readOnly
          />
        </TableCell>
        <TableCell>
          <Input
            id={`${product.id}-volume`}
            type="number"
            value={product.volume}
            onChange={handleVolumeChange}
            min="1"
            readOnly={readOnly}
          />
        </TableCell>
        <TableCell>
          <div className="text-center font-medium">
            ${totalPrice.toFixed(2)}
          </div>
        </TableCell>
        {!readOnly && removeProduct && (
          <button
            onClick={handleRemove}
            className="ml-auto text-gray-500 p-1 hover:text-red-500 translate-y-[15px]"
            aria-label="Remove product"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </TableRow>

      {/* Popup Component */}
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} togglePopup={togglePopup}>
          <h2 className="text-xl font-semibold mb-4">{`${product.name} Details`}</h2>
          <p>{`This is the content inside the popup for ${product.name}.`}</p>
          {/* You can add more product details here */}
        </Popup>
      )}
    </>
  );
};

export default ProductTableRow;









