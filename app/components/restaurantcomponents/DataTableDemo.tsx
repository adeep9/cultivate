"use client";

import * as React from "react";
import {
  CaretSortIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Product = {
  id: string;
  name: string;
  price: number;
};

interface DataTableProps {
  onAddProduct: (product: Product) => void;
}

const dummyData: Product[] = [
  { id: "1", name: "Tomato", price: 15 },
  { id: "2", name: "Apples", price: 69 },
  { id: "3", name: "Grapes", price: 20 },
];

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        // Disable the checkbox in the header to enforce single selection
        disabled={true}
      />
    ),
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => {
          // When a row is selected, clear all other selections first
          table.toggleAllRowsSelected(false);
          row.toggleSelected(true);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the price as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function DataTableDemo({ onAddProduct }: DataTableProps) {
  const [data] = React.useState<Product[]>(dummyData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  // Filter data based on globalFilter
  const filteredData = React.useMemo(() => {
    if (!globalFilter) return data;
    return data.filter((product) =>
      product.name.toLowerCase().includes(globalFilter.toLowerCase())
    );
  }, [data, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
  });

  const handleAdd = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      alert("Please select a product to add.");
      return;
    }
    const selectedProduct = selectedRows[0].original;
    onAddProduct(selectedProduct);
    // Clear selection after adding
    table.resetRowSelection();
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search Items"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className=""
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="translate-y-[18px]">
          <Button type="button" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
