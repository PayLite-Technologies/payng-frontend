"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    FaFileInvoice,
    FaCreditCard,
    FaCalendarAlt,
    FaDownload,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateSampleReceipt } from "@/lib/pdfGenerator";

export default function QuickActions() {
  const router = useRouter();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadReceipt = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateSampleReceipt();
      toast.success("Receipt downloaded successfully");
    } catch (error) {
      toast.error("Failed to generate receipt");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const actions = [
    {
      label: "Generate Invoice",
      icon: FaFileInvoice,
      onClick: () => router.push("/invoices/new"),
      primary: true,
    },
    {
      label: "Make Payment",
      icon: FaCreditCard,
      onClick: () => router.push("/payments/new"),
      primary: true,
    },
    {
      label: "Payment Plan",
      icon: FaCalendarAlt,
      onClick: () => router.push("/payment-plans"),
      primary: false,
    },
    {
      label: "Download Receipt",
      icon: FaDownload,
      onClick: handleDownloadReceipt,
      primary: false,
      loading: isGeneratingPDF,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-lg p-6"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
      >
        Quick Actions
      </h2>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              onClick={action.onClick}
              disabled={action.loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor: action.primary ? "#000080" : "#90EE90",
                color: action.primary ? "#FFFFFF" : "#000000",
                border: action.primary ? "none" : "1px solid #808080",
                fontFamily: "Inter, sans-serif",
                opacity: action.loading ? 0.6 : 1,
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{action.loading ? "Generating..." : action.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Info Box */}
      <div
        className="mt-6 p-4 rounded-lg"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <p className="text-xs" style={{ color: "#666666" }}>
          💡 Tip: Set up a payment plan to spread costs over time and avoid late
          fees.
        </p>
      </div>
    </motion.div>
  );
}
