// ============================================================================
// FILE: /app/payments/page.tsx
// Payment Processing Screen - Make new payments
// ============================================================================

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaShieldAlt,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";
import clsx from "clsx";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useDashboardStore } from "@/stores/dashboardStore";
import { processPayment } from "@/lib/api";

const paymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.enum(
    ["card", "mobile", "bank", "wallet"],
    "Payment method is required"
  ),
  feeTypes: z.array(z.string()).min(1, "Select at least one fee type"),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVV: z.string().optional(),
  phoneNumber: z.string().optional(),
  accountNumber: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentsPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");
  const [showFlutterwaveModal, setShowFlutterwaveModal] = useState(false);
  const { selectedStudent } = useDashboardStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
      feeTypes: [],
    },
  });

  const paymentMutation = useMutation({
    mutationFn: processPayment,
    onSuccess: () => {
      toast.success("Payment processed successfully!", {
        description: "Your receipt has been sent to your email",
      });
      // Redirect to success page or reset form
    },
    onError: (error: any) => {
      toast.error("Payment failed", {
        description: error.message || "Please try again",
      });
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    paymentMutation.mutate(data);
  };

  const paymentMethods = [
    { id: "card", label: "Credit/Debit Card", icon: FaCreditCard },
    { id: "mobile", label: "Mobile Money", icon: FaMobileAlt },
    { id: "bank", label: "Bank Transfer", icon: FaUniversity },
    { id: "wallet", label: "Wallet", icon: FaWallet },
  ];

  const availableFees = [
    {
      id: "tuition",
      label: "Tuition Fee",
      amount: 1200.0,
      dueDate: "2024-11-01",
    },
    { id: "lab", label: "Lab Fee", amount: 300.0, dueDate: "2024-10-25" },
    { id: "sports", label: "Sports Fee", amount: 200.0, dueDate: "2024-11-10" },
    {
      id: "library",
      label: "Library Fee",
      amount: 150.0,
      dueDate: "2024-10-30",
    },
  ];

  const selectedFees = watch("feeTypes") || [];
  const totalAmount = availableFees
    .filter((fee) => selectedFees.includes(fee.id))
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Make Payment
          </h1>
          <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
            Process payments for {selectedStudent?.name || "your student"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Select Fees */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <h2
                  className="text-xl font-bold mb-4"
                  style={{
                    color: "#000080",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Select Fees to Pay
                </h2>

                <div className="space-y-3">
                  {availableFees.map((fee) => (
                    <label
                      key={fee.id}
                      className={clsx(
                        "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-300",
                        selectedFees.includes(fee.id)
                          ? "border-[#90EE90] bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          value={fee.id}
                          {...register("feeTypes")}
                          className="w-5 h-5 rounded"
                          style={{ accentColor: "#90EE90" }}
                        />
                        <div>
                          <p
                            className="font-medium"
                            style={{
                              color: "#333333",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {fee.label}
                          </p>
                          <p className="text-xs" style={{ color: "#808080" }}>
                            Due: {fee.dueDate}
                          </p>
                        </div>
                      </div>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: "#000080" }}
                      >
                        ${fee.amount.toFixed(2)}
                      </p>
                    </label>
                  ))}
                </div>

                {errors.feeTypes && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.feeTypes.message}
                  </p>
                )}
              </motion.div>

              {/* Payment Method Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 mb-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <h2
                  className="text-xl font-bold mb-4"
                  style={{
                    color: "#000080",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Payment Method
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          setSelectedMethod(method.id);
                          setValue("paymentMethod", method.id as any);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={clsx(
                          "flex flex-col items-center gap-2 p-4 border rounded-lg transition-all duration-300",
                          selectedMethod === method.id
                            ? "border-[#90EE90] bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <Icon
                          className="w-8 h-8"
                          style={{
                            color:
                              selectedMethod === method.id
                                ? "#90EE90"
                                : "#808080",
                          }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{
                            color:
                              selectedMethod === method.id
                                ? "#000080"
                                : "#808080",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {method.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Payment Details Based on Method */}
                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#666666" }}
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        {...register("cardNumber")}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition-all duration-300"
                        style={{ color: "#333333" }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#D4AF37")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#666666" }}
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          {...register("cardExpiry")}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition-all duration-300"
                          style={{ color: "#333333" }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#D4AF37")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#E0E0E0")
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#666666" }}
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          {...register("cardCVV")}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition-all duration-300"
                          style={{ color: "#333333" }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#D4AF37")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#E0E0E0")
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "mobile" && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#666666" }}
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      {...register("phoneNumber")}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition-all duration-300"
                      style={{ color: "#333333" }}
                      onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                    />
                  </div>
                )}

                {selectedMethod === "bank" && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#666666" }}
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      {...register("accountNumber")}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition-all duration-300"
                      style={{ color: "#333333" }}
                      onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
                    />
                  </div>
                )}

                {selectedMethod === "wallet" && (
                  <div
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: "#F5F5F5" }}
                  >
                    <FaWallet
                      className="w-12 h-12 mx-auto mb-2"
                      style={{ color: "#90EE90" }}
                    />
                    <p className="text-sm" style={{ color: "#333333" }}>
                      Your wallet balance: <strong>$500.00</strong>
                    </p>
                  </div>
                )}

                {/* Security Notice */}
                <div
                  className="mt-4 p-3 rounded flex items-start gap-2"
                  style={{ backgroundColor: "#F0F8FF" }}
                >
                  <FaShieldAlt
                    className="w-5 h-5 mt-0.5"
                    style={{ color: "#000080" }}
                  />
                  <p className="text-xs" style={{ color: "#666666" }}>
                    <FaLock className="inline w-3 h-3 mr-1" />
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={
                  paymentMutation.isPending || selectedFees.length === 0
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-full text-base font-semibold transition-all duration-300 disabled:opacity-50"
                style={{
                  backgroundColor: "#000080",
                  color: "#FFFFFF",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {paymentMutation.isPending
                  ? "Processing..."
                  : `Pay $${totalAmount.toFixed(2)}`}
              </motion.button>
            </form>
          </div>

          {/* Right Column - Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                Payment Summary
              </h2>

              <div className="space-y-3 mb-6">
                {selectedFees.length === 0 ? (
                  <p className="text-sm" style={{ color: "#808080" }}>
                    No fees selected
                  </p>
                ) : (
                  availableFees
                    .filter((fee) => selectedFees.includes(fee.id))
                    .map((fee) => (
                      <div key={fee.id} className="flex justify-between">
                        <span className="text-sm" style={{ color: "#666666" }}>
                          {fee.label}
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#333333" }}
                        >
                          ${fee.amount.toFixed(2)}
                        </span>
                      </div>
                    ))
                )}
              </div>

              <div
                className="pt-4 mb-6"
                style={{ borderTop: "1px solid #E0E0E0" }}
              >
                <div className="flex justify-between items-center">
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: "#000080",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Total
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#000080" }}
                  >
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Benefits */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "#000080" }}
                >
                  Payment Benefits
                </p>
                <ul className="space-y-2">
                  <li
                    className="flex items-start gap-2 text-xs"
                    style={{ color: "#666666" }}
                  >
                    <FaCheckCircle
                      className="w-4 h-4 mt-0.5"
                      style={{ color: "#90EE90" }}
                    />
                    Instant payment confirmation
                  </li>
                  <li
                    className="flex items-start gap-2 text-xs"
                    style={{ color: "#666666" }}
                  >
                    <FaCheckCircle
                      className="w-4 h-4 mt-0.5"
                      style={{ color: "#90EE90" }}
                    />
                    Automatic receipt generation
                  </li>
                  <li
                    className="flex items-start gap-2 text-xs"
                    style={{ color: "#666666" }}
                  >
                    <FaCheckCircle
                      className="w-4 h-4 mt-0.5"
                      style={{ color: "#90EE90" }}
                    />
                    Secure encrypted transactions
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
