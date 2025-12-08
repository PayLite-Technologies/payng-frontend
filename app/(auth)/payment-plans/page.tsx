"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaCalendar, FaTrash } from "react-icons/fa";

export default function PaymentPlansPage() {
  const [plans] = useState([
    {
      id: "1",
      studentName: "Emma Wilson",
      totalAmount: 50000,
      installments: 3,
      amountPerInstallment: 16667,
      nextPaymentDate: "2024-12-15",
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
            Payment Plans
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
            Create Plan
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    {plan.studentName}
                  </h3>
                  <p className="text-sm" style={{ color: "#808080" }}>
                    {plan.installments} installments
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    plan.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {plan.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Total Amount:
                  </span>
                  <span className="font-bold" style={{ color: "#000080" }}>
                    ₦{plan.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Per Installment:
                  </span>
                  <span className="font-medium" style={{ color: "#333333" }}>
                    ₦{plan.amountPerInstallment.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendar className="w-4 h-4" style={{ color: "#808080" }} />
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Next: {new Date(plan.nextPaymentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                  style={{ color: "#000080" }}
                >
                  View Details
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

