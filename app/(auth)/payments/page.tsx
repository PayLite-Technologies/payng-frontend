"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaMoneyBillWave, FaMobile } from "react-icons/fa";

export default function PaymentsPage() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Make Payment
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
                Select Student
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="">Choose a student</option>
                <option value="student-1">Emma Wilson - Grade 10</option>
                <option value="student-2">James Wilson - Grade 8</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
                Amount (NGN)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "card", icon: FaCreditCard, label: "Card" },
                  { value: "bank", icon: FaMoneyBillWave, label: "Bank Transfer" },
                  { value: "mobile", icon: FaMobile, label: "Mobile Money" },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === method.value
                        ? "border-[#000080] bg-[#000080] bg-opacity-10"
                        : "border-[#E0E0E0]"
                    }`}
                  >
                    <method.icon
                      className="w-6 h-6 mx-auto mb-2"
                      style={{ color: paymentMethod === method.value ? "#000080" : "#808080" }}
                    />
                    <p
                      className="text-sm font-medium"
                      style={{ color: paymentMethod === method.value ? "#000080" : "#808080" }}
                    >
                      {method.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 rounded-[24px] text-white font-medium"
              style={{
                backgroundColor: "#000080",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Proceed to Payment
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

