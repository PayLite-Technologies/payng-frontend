"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  FaFileInvoice,
  FaChartLine,
  FaChartPie,
  FaFilter,
  FaDownload,
  FaCheckCircle,
} from "react-icons/fa";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const reconciliationSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  paymentMethod: z.enum(["all", "card", "mobile", "bank", "wallet"]).default("all"),
  status: z.enum(["all", "completed", "pending", "failed"]).default("all"),
  studentId: z.string().optional(),
});

type ReconciliationFormData = z.infer<typeof reconciliationSchema>;

// Mock data - replace with real API calls
const mockReconciliationData = {
  totalRevenue: 125000,
  totalTransactions: 342,
  completedPayments: 298,
  pendingPayments: 32,
  failedPayments: 12,
  feeTypeBreakdown: [
    { name: "Tuition Fee", value: 75000, count: 150 },
    { name: "Lab Fee", value: 18000, count: 60 },
    { name: "Sports Fee", value: 12000, count: 60 },
    { name: "Library Fee", value: 9000, count: 60 },
    { name: "Annual Fee", value: 11000, count: 12 },
  ],
  revenueByMonth: [
    { month: "Jan", revenue: 15000, transactions: 45 },
    { month: "Feb", revenue: 18000, transactions: 52 },
    { month: "Mar", revenue: 22000, transactions: 58 },
    { month: "Apr", revenue: 19000, transactions: 48 },
    { month: "May", revenue: 25000, transactions: 62 },
    { month: "Jun", revenue: 26000, transactions: 77 },
  ],
  paymentMethodBreakdown: [
    { name: "Card", value: 85000, percentage: 68 },
    { name: "Mobile Money", value: 25000, percentage: 20 },
    { name: "Bank Transfer", value: 12000, percentage: 10 },
    { name: "Wallet", value: 3000, percentage: 2 },
  ],
};

const COLORS = {
  primary: "#000080",
  secondary: "#90EE90",
  accent: "#D4AF37",
  success: "#32CD32",
  warning: "#FFA500",
  error: "#FF6B6B",
};

export default function ReconciliationPage() {
  const [showFilters, setShowFilters] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReconciliationFormData>({
    resolver: zodResolver(reconciliationSchema),
    defaultValues: {
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 6))
        .toISOString()
        .split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      paymentMethod: "all",
      status: "all",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["reconciliation", watch()],
    queryFn: async () => {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockReconciliationData;
    },
  });

  const exportMutation = useMutation({
    mutationFn: async (format: "csv" | "pdf") => {
      // TODO: Implement export functionality
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, format };
    },
    onSuccess: (_, format) => {
      toast.success(`Report exported as ${format.toUpperCase()}`, {
        description: "Download will start shortly",
      });
    },
    onError: () => {
      toast.error("Export failed", {
        description: "Please try again",
      });
    },
  });

  const onSubmit = (data: ReconciliationFormData) => {
    toast.info("Filters applied", {
      description: "Reconciliation data updated",
    });
    setShowFilters(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Reconciliation & Reporting
            </h1>
            <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
              View payment analytics and generate reports
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-[24px] font-medium transition-all duration-300"
              style={{
                backgroundColor: "#90EE90",
                color: "#000000",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <FaFilter className="inline mr-2" />
              Filters
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => exportMutation.mutate("csv")}
              disabled={exportMutation.isPending}
              className="px-4 py-2 rounded-[24px] font-medium transition-all duration-300 disabled:opacity-50"
              style={{
                backgroundColor: "#000080",
                color: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <FaDownload className="inline mr-2" />
              Export CSV
            </motion.button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-white border border-[#E0E0E0] rounded-lg p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                />
                {errors.startDate && (
                  <p className="text-xs mt-1" style={{ color: "#FF6B6B" }}>
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
                  End Date
                </label>
                <input
                  type="date"
                  {...register("endDate")}
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                />
                {errors.endDate && (
                  <p className="text-xs mt-1" style={{ color: "#FF6B6B" }}>
                    {errors.endDate.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
                  Payment Method
                </label>
                <select
                  {...register("paymentMethod")}
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                >
                  <option value="all">All Methods</option>
                  <option value="card">Card</option>
                  <option value="mobile">Mobile Money</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#666666" }}>
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div className="md:col-span-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 rounded-[24px] font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "#F5F5F5",
                    color: "#333333",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-[24px] font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "#000080",
                    color: "#FFFFFF",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Revenue",
              value: `₦${data?.totalRevenue.toLocaleString()}`,
              icon: FaChartLine,
              color: COLORS.primary,
            },
            {
              title: "Total Transactions",
              value: data?.totalTransactions.toString() || "0",
              icon: FaFileInvoice,
              color: COLORS.secondary,
            },
            {
              title: "Completed",
              value: data?.completedPayments.toString() || "0",
              icon: FaCheckCircle,
              color: COLORS.success,
            },
            {
              title: "Pending",
              value: data?.pendingPayments.toString() || "0",
              icon: FaChartPie,
              color: COLORS.warning,
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-[#E0E0E0] rounded-lg p-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#F5F5F5" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-sm mb-1" style={{ color: "#808080" }}>
                  {stat.title}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                >
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Fee Type Breakdown - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[#E0E0E0] rounded-lg p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Fee Type Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.feeTypeBreakdown || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data?.feeTypeBreakdown.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Payment Method Breakdown - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-[#E0E0E0] rounded-lg p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Payment Method Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.paymentMethodBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" style={{ fill: "#808080" }} />
                <YAxis style={{ fill: "#808080" }} />
                <Tooltip />
                <Bar dataKey="value" fill="#000080" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Revenue Trend - Line Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-[#E0E0E0] rounded-lg p-6"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Revenue Trend (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data?.revenueByMonth || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" style={{ fill: "#808080" }} />
              <YAxis style={{ fill: "#808080" }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#000080"
                strokeWidth={3}
                dot={{ fill: "#000080", r: 5 }}
                name="Revenue (₦)"
              />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#90EE90"
                strokeWidth={3}
                dot={{ fill: "#90EE90", r: 5 }}
                name="Transactions"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}


