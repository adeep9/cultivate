"use client";

import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import ProductTableRow from './searchproductscomponent'; // Adjust the import path if necessary
import { DataTableDemo, Product } from "./seachpopup";

export type ProductWithVolume = Product & { volume: number };

interface SearchProductsProps {
  products: ProductWithVolume[];
  setProducts: React.Dispatch<React.SetStateAction<ProductWithVolume[]>>;
  readOnly?: boolean;
  parLevel?: boolean;
}

export default function SearchProducts({ products, setProducts, readOnly = false , parLevel = false}: SearchProductsProps) {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState<boolean>(false);
  const parlvl = parLevel;
  const addProduct = (product: Product) => {
    // Initialize volume to 1 when adding a new product
    const productWithVolume = { ...product, volume: 1 };
    setProducts((prevProducts) => [...prevProducts, productWithVolume]);
    setIsSearchPopupOpen(false); // Close the search popup after adding
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  // Define the updateProductVolume function
  const updateProductVolume = (productId: string, newVolume: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, volume: newVolume } : product
      )
    );
  };

  const toggleSearchPopup = () => {
    setIsSearchPopupOpen(!isSearchPopupOpen);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
          {parLevel ? (
            "Par Level Items"
          ) : (
            readOnly ? (
                "Item Review"
              ) : (
                "Item Ordering"
            )
          )}

          </CardTitle>
          <CardDescription>
            {parLevel ? (
              "Helpful baseline for weekly ordering. Save time. Save money."
            ) : (
              readOnly ? (
              "Please review your selected items carefully"
            ) : (
              "Select from your collection of items"
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Product</TableHead>
                <TableHead className="w-36">Unit</TableHead>
                <TableHead className="w-48">Price Each</TableHead>
                <TableHead className="w-36 lg:w-96">Quantity</TableHead>
                <TableHead className="w-48">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    removeProduct={removeProduct}
                    updateProductVolume={updateProductVolume}
                    readOnly={readOnly}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                  {parLevel ? (
                    <div className="flex justify-center items-center min-h-[150px]">
                      <p className="text-m font-normal">No items selected. Click submit to have a blank Par Level.</p>
                    </div>
                  ) : (
                    readOnly ? (
                      <div className="flex justify-center items-center min-h-[150px]">
                        <p className="text-m font-normal text-red-500">You must have products selected.</p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center min-h-[150px]">
                        <p className="text-m font-normal">No products selected.</p>
                      </div>
                  ))}
                    
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {!readOnly && (
          <CardFooter className="justify-center border-t p-4">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="gap-1"
              onClick={toggleSearchPopup}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Product
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Search Products Popup */}
      {isSearchPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md">
            <Button
              type="button"
              variant="outline"
              onClick={toggleSearchPopup}
              className="mb-4"
            >
              Close
            </Button>
            <DataTableDemo onAddProduct={addProduct} />
          </div>
        </div>
      )}
    </div>
  );
}











