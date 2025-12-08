"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaPlus, FaSearch, FaUpload } from "react-icons/fa";

export default function StudentsPage() {
  const [students] = useState([
    {
      id: "1",
      name: "Emma Wilson",
      studentId: "STU-2024-0234",
      class: "Grade 10",
      status: "active",
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
            Students
          </h1>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 flex items-center gap-2"
              style={{ color: "#000080" }}
            >
              <FaUpload className="w-4 h-4" />
              Import
            </motion.button>
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
              Add Student
            </motion.button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="flex items-center gap-2">
            <FaSearch className="w-5 h-5" style={{ color: "#808080" }} />
            <input
              type="text"
              placeholder="Search students..."
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
                    Student
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Student ID
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Class
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#000080" }}
                        >
                          <FaUser className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {student.studentId}
                    </td>
                    <td className="py-4 px-6" style={{ color: "#333333" }}>
                      {student.class}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          student.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {student.status}
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

