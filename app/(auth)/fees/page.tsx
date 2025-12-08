"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileInvoice, FaCheckCircle, FaClock } from "react-icons/fa";

export default function FeesPage() {
  const [fees] = useState([
    {
      id: "1",
      type: "Tuition Fee",
      amount: 40000,
      currency: "NGN",
      status: "paid",
      dueDate: "2024-12-31",
      paidDate: "2024-11-15",
    },
    {
      id: "2",
      type: "Library Fee",
      amount: 5000,
      currency: "NGN",
      status: "paid",
      dueDate: "2024-12-31",
      paidDate: "2024-11-15",
    },
    {
      id: "3",
      type: "Sports Fee",
      amount: 5000,
      currency: "NGN",
      status: "pending",
      dueDate: "2024-12-31",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          My Fees
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <p className="text-sm mb-2" style={{ color: "#808080" }}>
              Total Fees
            </p>
            <p className="text-2xl font-bold" style={{ color: "#000080" }}>
              ₦50,000
            </p>
          </div>
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <p className="text-sm mb-2" style={{ color: "#808080" }}>
              Paid
            </p>
            <p className="text-2xl font-bold" style={{ color: "#90EE90" }}>
              ₦45,000
            </p>
          </div>
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <p className="text-sm mb-2" style={{ color: "#808080" }}>
              Pending
            </p>
            <p className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
              ₦5,000
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-gray-50">
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Fee Type
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
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaFileInvoice className="w-4 h-4" style={{ color: "#808080" }} />
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {fee.type}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      {fee.currency} {fee.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {fee.status === "paid" ? (
                          <>
                            <FaCheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800">Paid</span>
                          </>
                        ) : (
                          <>
                            <FaClock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-800">Pending</span>
                          </>
                        )}
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

