"use client";

import { motion } from "framer-motion";
import {
  FaHistory,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  method: string;
  reference: string;
}

interface RecentPaymentsProps {
  payments: Payment[];
}

export default function RecentPayments({ payments }: RecentPaymentsProps) {
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle style={{ color: "#32CD32" }} />;
      case "pending":
        return <FaClock style={{ color: "#FFA500" }} />;
      case "failed":
        return <FaTimesCircle style={{ color: "#FF6B6B" }} />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return { backgroundColor: "#90EE90", color: "#000000" };
      case "pending":
        return { backgroundColor: "#FFA500", color: "#FFFFFF" };
      case "failed":
        return { backgroundColor: "#FF6B6B", color: "#FFFFFF" };
      default:
        return { backgroundColor: "#E0E0E0", color: "#000000" };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border border-gray-200 rounded-lg p-6"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <FaHistory className="w-5 h-5" style={{ color: "#90EE90" }} />
          </div>
          <h2
            className="text-xl font-bold"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Recent Payments
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/history")}
          className="text-sm font-medium transition-all duration-300"
          style={{ color: "#000080" }}
        >
          View All →
        </motion.button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080" }}
              >
                Date
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080" }}
              >
                Reference
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080" }}
              >
                Amount
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080" }}
              >
                Method
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080" }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.slice(0, 5).map((payment, index) => (
              <motion.tr
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/payments/${payment.id}`)}
              >
                <td className="py-4 px-4 text-sm" style={{ color: "#333333" }}>
                  {payment.date}
                </td>
                <td
                  className="py-4 px-4 text-sm font-medium"
                  style={{ color: "#000080" }}
                >
                  {payment.reference}
                </td>
                <td
                  className="py-4 px-4 text-sm font-semibold"
                  style={{ color: "#000080" }}
                >
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-sm" style={{ color: "#666666" }}>
                  {payment.method}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(payment.status)}
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={getStatusStyle(payment.status)}
                    >
                      {payment.status}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {payments.slice(0, 5).map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer"
            onClick={() => router.push(`/payments/${payment.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium" style={{ color: "#000080" }}>
                  {payment.reference}
                </p>
                <p className="text-xs" style={{ color: "#808080" }}>
                  {payment.date}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(payment.status)}
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={getStatusStyle(payment.status)}
                >
                  {payment.status}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold" style={{ color: "#000080" }}>
                ${payment.amount.toFixed(2)}
              </p>
              <p className="text-sm" style={{ color: "#666666" }}>
                {payment.method}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <FaHistory
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "#E0E0E0" }}
          />
          <p className="text-sm" style={{ color: "#808080" }}>
            No payment history yet
          </p>
        </div>
      )}
    </motion.div>
  );
}
