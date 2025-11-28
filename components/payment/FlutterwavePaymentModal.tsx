"use client";

import { useState } from "react";
import { FlutterwaveButton, FlutterwaveConfig, closePaymentModal } from "flutterwave-react-v3";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaLock } from "react-icons/fa";
import { toast } from "sonner";
import { generateSampleReceipt } from "@/lib/pdfGenerator";

interface FlutterwavePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  studentId?: string;
  studentName?: string;
  feeTypes: string[];
  onSuccess?: (response: any) => void;
}

export default function FlutterwavePaymentModal({
  isOpen,
  onClose,
  amount,
  studentId,
  studentName,
  feeTypes,
  onSuccess,
}: FlutterwavePaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const config: FlutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: `PAYNG-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@example.com", // TODO: Get from auth context
      phone_number: "08012345678", // TODO: Get from user profile
      name: studentName || "Student",
    },
    customizations: {
      title: "Payng School Payment",
      description: `Payment for ${feeTypes.join(", ")}`,
      logo: "/logo.png", // TODO: Add logo
    },
    meta: {
      studentId: studentId || "",
      feeTypes: feeTypes.join(","),
    },
  };

  const handlePaymentSuccess = async (response: any) => {
    setIsProcessing(true);
    try {
      // Generate PDF receipt
      await generateSampleReceipt();

      // Show success toast
      toast.success("Payment successful!", {
        description: `Payment of ₦${amount.toLocaleString()} processed successfully`,
        duration: 5000,
      });

      // Call success callback
      if (onSuccess) {
        onSuccess(response);
      }

      // Close modal after delay
      setTimeout(() => {
        closePaymentModal();
        onClose();
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast.error("Payment successful but receipt generation failed", {
        description: "Please contact support for your receipt",
      });
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error);
    toast.error("Payment failed", {
      description: error.message || "Please try again or contact support",
    });
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #E0E0E0",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    Complete Payment
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "#808080" }}>
                    Secure payment via Flutterwave
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={isProcessing}
                >
                  <FaTimes className="w-5 h-5" style={{ color: "#808080" }} />
                </button>
              </div>

              {/* Payment Details */}
              <div className="mb-6 space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "#F5F5F5" }}>
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Amount:
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
                {studentName && (
                  <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "#F5F5F5" }}>
                    <span className="text-sm" style={{ color: "#666666" }}>
                      Student:
                    </span>
                    <span className="text-sm font-medium" style={{ color: "#333333" }}>
                      {studentName}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "#F5F5F5" }}>
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Fee Types:
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#333333" }}>
                    {feeTypes.join(", ")}
                  </span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mb-6 p-3 rounded-lg flex items-center gap-2" style={{ backgroundColor: "#F0F8FF", border: "1px solid #000080" }}>
                <FaLock className="w-4 h-4" style={{ color: "#000080" }} />
                <p className="text-xs" style={{ color: "#000080" }}>
                  Your payment is secured by Flutterwave. We never store your card details.
                </p>
              </div>

              {/* Flutterwave Button */}
              <div className="flex flex-col gap-3">
                <FlutterwaveButton
                  {...config}
                  callback={handlePaymentSuccess}
                  onClose={handlePaymentError}
                  className="w-full"
                >
                  {({ handleClick }: any) => (
                    <motion.button
                      onClick={handleClick}
                      disabled={isProcessing}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 rounded-[24px] text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: "#000080",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {isProcessing ? "Processing..." : `Pay ₦${amount.toLocaleString()}`}
                    </motion.button>
                  )}
                </FlutterwaveButton>

                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="w-full py-3 px-6 rounded-[24px] font-medium transition-all duration-300 disabled:opacity-50"
                  style={{
                    backgroundColor: "#90EE90",
                    color: "#000000",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


