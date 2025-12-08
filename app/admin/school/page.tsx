"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaFileInvoice, FaMoneyBillWave, FaUsers } from "react-icons/fa";

export default function InstitutionAdminDashboardPage() {
  const stats = [
    { label: "Total Students", value: "500", icon: FaUsers, color: "#000080" },
    { label: "Pending Invoices", value: "25", icon: FaFileInvoice, color: "#D4AF37" },
    { label: "Revenue (This Month)", value: "₦2.5M", icon: FaMoneyBillWave, color: "#90EE90" },
    { label: "Payment Rate", value: "85%", icon: FaGraduationCap, color: "#FF6B6B" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Institution Dashboard
        </h1>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Recent Payments
            </h2>
            <div className="space-y-4">
              {/* TODO: Map through recent payments */}
              <div className="p-4 border border-[#E0E0E0] rounded-lg">
                <p className="font-medium mb-1" style={{ color: "#333333" }}>
                  Payment Received
                </p>
                <p className="text-sm" style={{ color: "#808080" }}>
                  ₦50,000 - 2 hours ago
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 text-left transition-colors"
                style={{ color: "#000080" }}
              >
                Manage Students
              </button>
              <button
                className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 text-left transition-colors"
                style={{ color: "#000080" }}
              >
                Create Fee Schedule
              </button>
              <button
                className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 text-left transition-colors"
                style={{ color: "#000080" }}
              >
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

