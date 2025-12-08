"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaStore, FaCheckCircle, FaClock, FaTimes } from "react-icons/fa";

export default function MerchantsOnboardingPage() {
  const [merchants] = useState([
    {
      id: "1",
      name: "Flutterwave",
      type: "Payment Gateway",
      status: "active",
      onboardedDate: "2024-01-15",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Merchant Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchants.map((merchant) => (
            <motion.div
              key={merchant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#000080" }}
                >
                  <FaStore className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    {merchant.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#808080" }}>
                    {merchant.type}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Status:
                  </span>
                  <div className="flex items-center gap-2">
                    {merchant.status === "active" ? (
                      <FaCheckCircle className="w-4 h-4 text-green-600" />
                    ) : merchant.status === "pending" ? (
                      <FaClock className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <FaTimes className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        merchant.status === "active"
                          ? "bg-green-100 text-green-800"
                          : merchant.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {merchant.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Onboarded:
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#333333" }}>
                    {new Date(merchant.onboardedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                style={{ color: "#000080" }}
              >
                Manage
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

