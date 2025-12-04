"use client";

import { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
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
  onSuccess?: (response: unknown) => void;
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

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: `PAYNG-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    amount,
    currency: "NGN" as const,
    payment_options: "card,mobilemoney,ussd,banktransfer",
    customer: {
      email: "user@example.com", // TODO: Replace with real user email from auth
      phone_number: "08012345678", // TODO: Replace with real phone
      name: studentName || "Student",
    },
    customizations: {
      title: "Payng School Payment",
      description: `Payment for ${feeTypes.join(", ")}`,
      logo: "https://payng.vercel.app/logo.png", // Use absolute URL
    },
    meta: {
      studentId: studentId || "",
      feeTypes: feeTypes.join(","),
    },
  };

  // This is the new correct way to initialize Flutterwave
  const handleFlutterwavePayment = useFlutterwave(config);

  const handlePaymentSuccess = async (response: unknown) => {
    setIsProcessing(true);
    try {
      await generateSampleReceipt();

      toast.success("Payment successful!", {
        description: `₦${amount.toLocaleString()} paid successfully`,
        duration: 6000,
      });

      onSuccess?.(response);
    } catch (error) {
      console.error("Receipt generation failed:", error);
      toast.error("Payment completed but receipt failed", {
        description: "Contact support if you don't receive your receipt via email.",
      });
    } finally {
      setTimeout(() => {
        closePaymentModal(); // Close Flutterwave modal
        onClose(); // Close our custom modal
        setIsProcessing(false);
      }, 2000);
    }
  };

  const handlePaymentClose = () => {
    if (!isProcessing) {
      toast.info("Payment cancelled");
    }
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
                  <h2 className="text-xl font-bold" style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}>
                    Complete Payment
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "#808080" }}>
                    Secure payment via Flutterwave
                  </p>
                </div>
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="w-5 h-5" style={{ color: "#808080" }} />
                </button>
              </div>

              {/* Payment Summary */}
              <div className="mb-6 space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="text-lg font-bold" style={{ color: "#000080" }}>
                    ₦{amount.toLocaleString()}
                  </span>
                </div>
                {studentName && (
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-gray-600">Student:</span>
                    <span className="text-sm font-medium text-gray-900">{studentName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                  <span className="text-sm text-gray-600">Fee Types:</span>
                  <span className="text-sm font-medium text-gray-900">{feeTypes.join(", ")}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mb-6 p-3 rounded-lg flex items-center gap-2 border" style={{ backgroundColor: "#F0F8FF", borderColor: "#000080" }}>
                <FaLock className="w-4 h-4" style={{ color: "#000080" }} />
                <p className="text-xs" style={{ color: "#000080" }}>
                  Your payment is secured by Flutterwave. We never store your card details.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isProcessing}
                  onClick={() => {
                    handleFlutterwavePayment({
                      callback: (response) => {
                        if ((response as any)?.status === "successful") {
                          handlePaymentSuccess(response);
                        }
                      },
                      onClose: handlePaymentClose,
                    });
                  }}
                  className="w-full py-4 px-6 rounded-[24px] text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#000080",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {isProcessing ? "Processing Payment..." : `Pay ₦${amount.toLocaleString()}`}
                </motion.button>

                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-[24px] font-medium transition-all"
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