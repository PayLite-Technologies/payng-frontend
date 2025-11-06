"use client";

import { motion } from "framer-motion";
import { FaWallet, FaCalendar, FaExclamationCircle } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface FeeSummaryProps {
  fees: {
    total: number;
    paid: number;
    outstanding: number;
    overdueFees: number;
    breakdown: Array<{
      category: string;
      amount: number;
      dueDate: string;
      status: "paid" | "pending" | "overdue";
    }>;
  };
  studentName?: string;
}

export default function FeeSummaryCard({ fees, studentName }: FeeSummaryProps) {
  if (!fees) return null;

  const pieData = fees.breakdown.map((item) => ({
    name: item.category,
    value: item.amount,
    status: item.status,
  }));

  const COLORS = {
    paid: "#90EE90",
    pending: "#FFA500",
    overdue: "#FF6B6B",
  };

  const completionPercentage = ((fees.paid / fees.total) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
        borderColor: "#90EE90",
      }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg p-6"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2
            className="text-xl font-bold mb-1"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Fee Summary
          </h2>
          {studentName && (
            <p className="text-sm" style={{ color: "#808080" }}>
              for {studentName}
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <FaWallet className="w-6 h-6" style={{ color: "#90EE90" }} />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm mb-1" style={{ color: "#808080" }}>
            Total Fees
          </p>
          <p className="text-2xl font-bold" style={{ color: "#000080" }}>
            ${fees.total.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm mb-1" style={{ color: "#808080" }}>
            Paid
          </p>
          <p className="text-2xl font-bold" style={{ color: "#32CD32" }}>
            ${fees.paid.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm mb-1" style={{ color: "#808080" }}>
            Outstanding
          </p>
          <p className="text-2xl font-bold" style={{ color: "#FF6B6B" }}>
            ${fees.outstanding.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Overdue Alert */}
      {fees.overdueFees > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 p-4 rounded-lg flex items-center gap-3"
          style={{ backgroundColor: "#FFF3CD", border: "1px solid #FFA500" }}
        >
          <FaExclamationCircle
            className="w-5 h-5"
            style={{ color: "#FF6B6B" }}
          />
          <div>
            <p className="text-sm font-medium" style={{ color: "#000080" }}>
              Overdue Fees: ${fees.overdueFees.toFixed(2)}
            </p>
            <p className="text-xs" style={{ color: "#666666" }}>
              Please make payment to avoid late fees
            </p>
          </div>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: "#666666" }}>
            Payment Progress
          </span>
          <span className="text-sm font-semibold" style={{ color: "#000080" }}>
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: "#90EE90" }}
          />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.status]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Fee Breakdown */}
      <div>
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: "#808080", fontFamily: "Poppins, sans-serif" }}
        >
          Fee Breakdown
        </h3>
        <div className="space-y-3">
          {fees.breakdown.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "#333333" }}>
                  {item.category}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <FaCalendar
                    className="w-3 h-3"
                    style={{ color: "#808080" }}
                  />
                  <p className="text-xs" style={{ color: "#808080" }}>
                    Due: {item.dueDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#000080" }}
                >
                  ${item.amount.toFixed(2)}
                </p>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: COLORS[item.status],
                    color: "#000000",
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
