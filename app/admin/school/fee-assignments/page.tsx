"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileInvoice, FaPlus, FaUser } from "react-icons/fa";

export default function FeeAssignmentsPage() {
  const [assignments] = useState([
    {
      id: "1",
      studentName: "Emma Wilson",
      feeType: "Tuition Fee",
      amount: 40000,
      status: "assigned",
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
            Fee Assignments
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-[24px] text-white font-medium flex items-center gap-2"
            style={{
              backgroundColor: "#000080",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <FaPlus className="w-4 h-4" />
            Assign Fee
          </motion.button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-gray-50">
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Student
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Fee Type
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Amount
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <FaUser className="w-4 h-4" style={{ color: "#808080" }} />
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {assignment.studentName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {assignment.feeType}
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      ₦{assignment.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          assignment.status === "assigned"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {assignment.status}
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

