"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaFileInvoice, FaCreditCard, FaChartLine } from "react-icons/fa";

export default function DashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // TODO: Fetch from API based on user role
  const stats = [
    { label: "Total Invoices", value: "12", icon: FaFileInvoice, color: "#000080" },
    { label: "Pending Payments", value: "₦150,000", icon: FaCreditCard, color: "#D4AF37" },
    { label: "Paid This Term", value: "₦450,000", icon: FaChartLine, color: "#90EE90" },
    { label: "Active Students", value: "3", icon: FaGraduationCap, color: "#FF6B6B" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-3xl font-bold mb-6"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Dashboard
          </h1>

          {/* Student Selector (for Parents) */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
              Select Student
            </label>
            <select
              value={selectedStudent || ""}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="">All Students</option>
              <option value="student-1">Emma Wilson - Grade 10</option>
              <option value="student-2">James Wilson - Grade 8</option>
            </select>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.color + "20" }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-sm mb-1" style={{ color: "#808080" }}>
                  {stat.label}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                >
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Recent Activity
            </h2>
            <div className="space-y-4">
              {/* TODO: Map through recent activities */}
              <div className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-lg">
                <div>
                  <p className="font-medium" style={{ color: "#333333" }}>
                    Payment Received
                  </p>
                  <p className="text-sm" style={{ color: "#808080" }}>
                    Tuition Fee - Emma Wilson
                  </p>
                </div>
                <p className="font-bold" style={{ color: "#000080" }}>
                  ₦50,000
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

