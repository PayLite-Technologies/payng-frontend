"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaFilePdf, FaCheckCircle } from "react-icons/fa";

export default function ClearancePage() {
  const [clearanceStatus, setClearanceStatus] = useState<"eligible" | "not_eligible">("eligible");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Clearance Certificate
        </h1>

        {clearanceStatus === "eligible" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-8 text-center"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#90EE90" }}
            >
              <FaCheckCircle className="w-10 h-10" style={{ color: "#000000" }} />
            </div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              You are Eligible for Clearance
            </h2>
            <p className="mb-8" style={{ color: "#808080" }}>
              All fees have been paid. You can now download your clearance certificate.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-[24px] text-white font-medium flex items-center gap-2 mx-auto"
              style={{
                backgroundColor: "#000080",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <FaFilePdf className="w-5 h-5" />
              Download Clearance Certificate
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-8"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Not Eligible for Clearance
            </h2>
            <p className="mb-4" style={{ color: "#808080" }}>
              You have outstanding fees that need to be paid before you can download your clearance certificate.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-medium mb-2" style={{ color: "#333333" }}>
                Outstanding Amount: ₦5,000
              </p>
              <button
                className="px-6 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: "#000080" }}
              >
                Pay Now
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

