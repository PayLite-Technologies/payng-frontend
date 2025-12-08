"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaSearch, FaDownload } from "react-icons/fa";

export default function FinanceTransactionsPage() {
  const [transactions] = useState([
    {
      id: "1",
      reference: "TXN-2024-001",
      institution: "Sample School",
      amount: 50000,
      status: "completed",
      date: "2024-11-15",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            All Transactions
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 flex items-center gap-2"
            style={{ color: "#000080" }}
          >
            <FaDownload className="w-4 h-4" />
            Export
          </motion.button>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="flex items-center gap-2">
            <FaSearch className="w-5 h-5" style={{ color: "#808080" }} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="flex-1 px-4 py-2 border-none outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-gray-50">
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Reference
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Institution
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Amount
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Date
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="w-4 h-4" style={{ color: "#808080" }} />
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {transaction.reference}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {transaction.institution}
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      ₦{transaction.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
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

