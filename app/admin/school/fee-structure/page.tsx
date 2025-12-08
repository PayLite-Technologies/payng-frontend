"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileInvoice, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function FeeStructurePage() {
  const [feeTypes] = useState([
    {
      id: "1",
      name: "Tuition Fee",
      description: "Main academic fee",
      category: "Academic",
    },
    {
      id: "2",
      name: "Library Fee",
      description: "Library access fee",
      category: "Facility",
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
            Fee Structure
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
            Add Fee Type
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feeTypes.map((feeType) => (
            <motion.div
              key={feeType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#000080" }}
                >
                  <FaFileInvoice className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    {feeType.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#808080" }}>
                    {feeType.category}
                  </p>
                </div>
              </div>

              <p className="text-sm mb-4" style={{ color: "#666666" }}>
                {feeType.description}
              </p>

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

