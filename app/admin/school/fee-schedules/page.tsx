"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaPlus, FaEdit } from "react-icons/fa";

export default function FeeSchedulesPage() {
  const [schedules] = useState([
    {
      id: "1",
      feeType: "Tuition Fee",
      class: "Grade 10",
      term: "First Term",
      amount: 40000,
      dueDate: "2024-12-31",
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
            Fee Schedules
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
            Create Schedule
          </motion.button>
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
                    Class
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Term
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Amount
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Due Date
                  </th>
                  <th className="text-right py-4 px-6" style={{ color: "#000080" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {schedule.feeType}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {schedule.class}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {schedule.term}
                    </td>
                    <td className="py-4 px-6 font-medium" style={{ color: "#333333" }}>
                      ₦{schedule.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {new Date(schedule.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                          style={{ color: "#000080" }}
                        >
                          <FaEdit className="w-4 h-4" />
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

