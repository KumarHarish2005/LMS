
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const CourseTable = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen min-w-0 space-y-6 p-4 md:p-8">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Courses
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and track your created courses.
          </p>
        </div>

        <Button
          onClick={() => navigate("/admin/courses/create")}
          className="gap-2 w-full sm:w-auto"
        >
          <Plus size={18} />
          Create New Course
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">

        <Table>
          <TableCaption className="pb-4">
            A list of your recent courses.
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
              <TableHead className="min-w-[120px] font-semibold">
                Course ID
              </TableHead>
              <TableHead className="min-w-[120px] font-semibold">
                Status
              </TableHead>
              <TableHead className="min-w-[150px] font-semibold">
                Title
              </TableHead>
              <TableHead className="min-w-[120px] text-right font-semibold">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.invoice}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/60"
              >
                <TableCell className="font-medium">
                  {invoice.invoice}
                </TableCell>

                <TableCell>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      invoice.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                        : invoice.paymentStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                    }`}
                  >
                    {invoice.paymentStatus}
                  </span>
                </TableCell>

                <TableCell className="text-gray-600 dark:text-gray-300">
                  {invoice.paymentMethod}
                </TableCell>

                <TableCell className="text-right font-medium">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">
                Total
              </TableCell>
              <TableCell className="text-right font-bold">
                $2,250.00
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
