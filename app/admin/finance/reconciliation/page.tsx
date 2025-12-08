"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function FinanceReconciliationPage() {
  const [reconciliations] = useState([
    {
      id: "1",
      institution: "Sample School",
      date: "2024-11-15",
      expected: 500000,
      received: 500000,
      status: "matched",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Global Reconciliation
        </h1>

        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-gray-50">
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Institution
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Date
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Expected
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Received
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {reconciliations.map((recon) => (
                  <tr key={recon.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {recon.institution}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {new Date(recon.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      ₦{recon.expected.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      ₦{recon.received.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {recon.status === "matched" ? (
                          <>
                            <FaCheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-800">Matched</span>
                          </>
                        ) : (
                          <>
                            <FaExclamationTriangle className="w-4 h-4 text-yellow-600" />
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

