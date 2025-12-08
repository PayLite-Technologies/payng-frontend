"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaDownload, FaCalendar } from "react-icons/fa";

export default function SchoolReportsPage() {
  const [dateRange, setDateRange] = useState("month");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            School Reports
          </h1>
          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Revenue", value: "₦2.5M", change: "+15%" },
            { label: "Students", value: "500", change: "+5%" },
            { label: "Transactions", value: "450", change: "+12%" },
            { label: "Payment Rate", value: "85%", change: "+3%" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <p className="text-sm mb-2" style={{ color: "#808080" }}>
                {stat.label}
              </p>
              <p
                className="text-2xl font-bold mb-1"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Revenue Trend
          </h2>
          <div className="h-64 flex items-center justify-center" style={{ color: "#808080" }}>
            <FaChartLine className="w-16 h-16" />
            <p className="ml-4">Chart will be rendered here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

