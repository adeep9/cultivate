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
import { DataTableDemo, Product } from './DataTableDemo'; // Import DataTableDemo and Product type

export type ProductWithVolume = Product & { volume: number };

interface SearchProductsProps {
  products: ProductWithVolume[];
  setProducts: React.Dispatch<React.SetStateAction<ProductWithVolume[]>>;
  readOnly?: boolean;
}

export default function SearchProducts({ products, setProducts, readOnly = false }: SearchProductsProps) {
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState<boolean>(false);

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
          <CardTitle>Manual Order</CardTitle>
          <CardDescription>Select From our Catalogue</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-64">Product</TableHead>
                <TableHead className="w-48">Price (Per Unit)</TableHead>
                <TableHead className="w-36 lg:w-96">Volume</TableHead>
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
                  <TableCell colSpan={4} className="text-center">
                    No products added.
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











