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
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import ProductTableRow from './searchproductscomponent';

export default function SearchProducts() {
  const [productRows, setProductRows] = useState<string[]>(["Carrot"]);

  const addVariant = () => {
    const newProductCode = `Potato-${productRows.length + 1}`; // Ensure unique product code
    setProductRows([...productRows, newProductCode]);
  };

  const removeVariant = (productCode: string) => {
    setProductRows(productRows.filter(code => code !== productCode));
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
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead className="w-36">Price (Per Unit)</TableHead>
                <TableHead className="w-36 lg:w-64">Volume</TableHead>
                <TableHead className="w-32">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productRows.map((productCode) => (
                <ProductTableRow
                  key={productCode}
                  productCode={productCode}
                  removeVariant={removeVariant} // Passing the remove function as a prop
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <Button size="sm" variant="ghost" className="gap-1" onClick={addVariant}>
            <PlusCircle className="h-3.5 w-3.5" />
            Add Variant
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}






