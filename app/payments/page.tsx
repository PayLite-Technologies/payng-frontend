"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useDashboardStore } from "@/stores/dashboardStore";
import FlutterwavePaymentModal from "@/components/payment/FlutterwavePaymentModal";
import { fetchDashboardData } from "@/lib/api";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

const paymentSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Amount must be a positive number"
    ),
  paymentMethod: z.enum(["flutterwave", "arca"], "Payment method is required"),
  feeTypes: z.array(z.string()).min(1, "Select at least one fee type"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentsPage() {
  const { selectedStudent } = useDashboardStore();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard", selectedStudent?.id],
    queryFn: () => fetchDashboardData(),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "flutterwave",
      feeTypes: [],
    },
  });

  const availableFees = dashboardData?.fees?.breakdown || [];
  const selectedFeeIds = watch("feeTypes") || [];
  const totalAmount = availableFees
    .filter((fee: any) => selectedFeeIds.includes(fee.category))
    .reduce((sum: number, fee: any) => sum + fee.amount, 0);

  const onSubmit = (data: PaymentFormData) => {
    if (totalAmount === 0) {
      toast.error("Please select at least one fee to pay");
      return;
    }

    setSelectedFees(data.feeTypes);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (response: any) => {
    toast.success("Payment processed successfully!", {
      description: "Your receipt has been sent to your email",
    });
    reset();
    setSelectedFees([]);
    // TODO: Invalidate queries to refresh dashboard data
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <SkeletonLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Select fees and complete your payment securely
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Fee Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Student Info */}
              {selectedStudent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#E0E0E0] rounded-lg p-6"
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                >
                  <h2
                    className="text-lg font-semibold mb-4"
                    style={{
                      color: "#000080",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Student Information
                  </h2>
                  <div className="space-y-2">
                    <p className="text-sm" style={{ color: "#666666" }}>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedStudent.name}
                    </p>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      <span className="font-medium">Grade:</span>{" "}
                      {selectedStudent.grade}
                    </p>
                    <p className="text-sm" style={{ color: "#666666" }}>
                      <span className="font-medium">Student ID:</span>{" "}
                      {selectedStudent.studentId}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Fee Selection */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-[#E0E0E0] rounded-lg p-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: "#000080",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Select Fees to Pay
                </h2>

                {availableFees.length === 0 ? (
                  <p className="text-sm" style={{ color: "#808080" }}>
                    No outstanding fees available
                  </p>
                ) : (
                  <div className="space-y-3">
                    {availableFees.map((fee: any, index: number) => {
                      const isSelected = selectedFeeIds.includes(fee.category);
                      return (
                        <motion.label
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300"
                          style={{
                            backgroundColor: isSelected ? "#F0F8FF" : "#F5F5F5",
                            border: `1px solid ${
                              isSelected ? "#000080" : "#E0E0E0"
                            }`,
                          }}
                        >
                          <input
                            type="checkbox"
                            value={fee.category}
                            {...register("feeTypes")}
                            className="w-5 h-5 rounded"
                            style={{ accentColor: "#000080" }}
                          />
                          <div className="flex-1">
                            <p
                              className="font-medium"
                              style={{ color: "#333333" }}
                            >
                              {fee.category}
                            </p>
                            <p className="text-sm" style={{ color: "#808080" }}>
                              Due: {fee.dueDate} • Status: {fee.status}
                            </p>
                          </div>
                          <p
                            className="text-lg font-bold"
                            style={{
                              color: "#000080",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            ${fee.amount.toFixed(2)}
                          </p>
                        </motion.label>
                      );
                    })}
                  </div>
                )}

                {errors.feeTypes && (
                  <p className="text-sm mt-2" style={{ color: "#FF6B6B" }}>
                    {errors.feeTypes.message}
                  </p>
                )}
              </motion.div>

              {/* Payment Method Selection */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-[#E0E0E0] rounded-lg p-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: "#000080",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Payment Method
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      id: "flutterwave",
                      label: "Flutterwave",
                      icon: FaCreditCard,
                    },
                    { id: "arca", label: "Arca (Proxy)", icon: FaUniversity },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = watch("paymentMethod") === method.id;
                    return (
                      <motion.label
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          isSelected ? "ring-2 ring-primary" : ""
                        }`}
                        style={{
                          backgroundColor: isSelected ? "#F0F8FF" : "#F5F5F5",
                          border: `1px solid ${
                            isSelected ? "#000080" : "#E0E0E0"
                          }`,
                        }}
                      >
                        <input
                          type="radio"
                          value={method.id}
                          {...register("paymentMethod")}
                          className="w-4 h-4"
                          style={{ accentColor: "#000080" }}
                        />
                        <Icon
                          className="w-5 h-5"
                          style={{ color: "#000080" }}
                        />
                        <span
                          className="font-medium"
                          style={{ color: "#333333" }}
                        >
                          {method.label}
                        </span>
                      </motion.label>
                    );
                  })}
                </div>
                {errors.paymentMethod && (
                  <p className="text-sm mt-2" style={{ color: "#FF6B6B" }}>
                    {errors.paymentMethod.message}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-[#E0E0E0] rounded-lg p-6 sticky top-8"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{
                    color: "#000080",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Payment Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "#666666" }}>
                      Selected Fees:
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#333333" }}
                    >
                      {selectedFeeIds.length}
                    </span>
                  </div>

                  <div className="border-t border-[#E0E0E0] pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm" style={{ color: "#666666" }}>
                        Subtotal:
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#333333" }}
                      >
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className="text-lg font-bold"
                        style={{
                          color: "#000080",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Total:
                      </span>
                      <span
                        className="text-2xl font-bold"
                        style={{
                          color: "#000080",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        ₦{(totalAmount * 1500).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={totalAmount === 0}
                  className="w-full py-3 px-6 rounded-[24px] text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#000080",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Proceed to Payment
                </motion.button>

                <div
                  className="mt-4 flex items-center gap-2 text-xs"
                  style={{ color: "#808080" }}
                >
                  <FaCheckCircle
                    className="w-3 h-3"
                    style={{ color: "#90EE90" }}
                  />
                  <span>Secure payment processing</span>
                </div>
              </motion.div>
            </div>
          </div>
        </form>

        {/* Flutterwave Payment Modal */}
        {showPaymentModal && (
          <FlutterwavePaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            amount={totalAmount * 1500} // Convert to NGN (example rate)
            studentId={selectedStudent?.id}
            studentName={selectedStudent?.name}
            feeTypes={selectedFees}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
