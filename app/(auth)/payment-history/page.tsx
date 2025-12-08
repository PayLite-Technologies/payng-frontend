"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaFileInvoice, FaCheckCircle } from "react-icons/fa";

export default function PaymentHistoryPage() {
  const [payments] = useState([
    {
      id: "1",
      reference: "PAY-2024-001",
      studentName: "Emma Wilson",
      amount: 50000,
      currency: "NGN",
      status: "completed",
      date: "2024-11-15",
      method: "Card",
    },
    {
      id: "2",
      reference: "PAY-2024-002",
      studentName: "James Wilson",
      amount: 45000,
      currency: "NGN",
      status: "completed",
      date: "2024-10-20",
      method: "Bank Transfer",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Payment History
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
                    Method
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Date
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
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaFileInvoice className="w-4 h-4" style={{ color: "#808080" }} />
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {payment.reference}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {payment.studentName}
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      {payment.currency} {payment.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {payment.method}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800 capitalize">{payment.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                          style={{ color: "#000080" }}
                          title="Download Receipt"
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

