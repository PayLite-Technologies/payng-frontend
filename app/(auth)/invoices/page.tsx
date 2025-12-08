"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileInvoice, FaEye, FaDownload } from "react-icons/fa";
import Link from "next/link";

export default function InvoicesPage() {
  const [invoices] = useState([
    {
      id: "1",
      reference: "INV-2024-001",
      studentName: "Emma Wilson",
      amount: 50000,
      currency: "NGN",
      status: "pending",
      dueDate: "2024-12-31",
      createdAt: "2024-11-01",
    },
    {
      id: "2",
      reference: "INV-2024-002",
      studentName: "James Wilson",
      amount: 45000,
      currency: "NGN",
      status: "paid",
      dueDate: "2024-12-15",
      createdAt: "2024-10-15",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Invoices
        </h1>

        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-gray-50">
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Reference
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Student
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Amount
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Due Date
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Status
                  </th>
                  <th className="text-right py-4 px-6" style={{ color: "#000080" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaFileInvoice className="w-4 h-4" style={{ color: "#808080" }} />
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {invoice.reference}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {invoice.studentName}
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      {invoice.currency} {invoice.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="p-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                          style={{ color: "#000080" }}
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                          style={{ color: "#000080" }}
                        >
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

