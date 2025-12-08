"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminsPage() {
  const [admins] = useState([
    {
      id: "1",
      name: "Admin User",
      email: "admin@payng.com",
      role: "support",
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
            Platform Staff
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
            Add Staff
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <motion.div
              key={admin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#000080" }}
                >
                  <FaUserShield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    {admin.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#808080" }}>
                    {admin.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Role:
                  </span>
                  <span className="text-sm font-medium capitalize" style={{ color: "#333333" }}>
                    {admin.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Status:
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      admin.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {admin.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  style={{ color: "#000080" }}
                >
                  <FaEdit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                  style={{ color: "#FF6B6B" }}
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

