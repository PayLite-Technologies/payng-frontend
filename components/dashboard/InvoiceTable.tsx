"use client";

import { motion } from "framer-motion";
import { FaFileInvoice, FaDownload, FaEye, FaCalendar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/api";
import { useDashboardStore } from "@/stores/dashboardStore";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  feeTypes: string[];
  createdAt: string;
}

export default function InvoiceTable() {
  const router = useRouter();
  const { selectedStudent } = useDashboardStore();

  const { data, isLoading } = useQuery({
    queryKey: ["invoices", selectedStudent?.id],
    queryFn: async () => {
      // TODO: Replace with real API call
      const dashboardData = await fetchDashboardData();
      return {
        invoices: dashboardData.fees.breakdown.map((fee: any, index: number) => ({
          id: `INV-${index + 1}`,
          invoiceNumber: `INV-2024-${String(index + 1).padStart(4, "0")}`,
          amount: fee.amount,
          dueDate: fee.dueDate,
          status: fee.status,
          feeTypes: [fee.category],
          createdAt: new Date().toISOString(),
        })),
      };
    },
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "paid":
        return { backgroundColor: "#90EE90", color: "#000000" };
      case "pending":
        return { backgroundColor: "#FFA500", color: "#FFFFFF" };
      case "overdue":
        return { backgroundColor: "#FF6B6B", color: "#FFFFFF" };
      default:
        return { backgroundColor: "#E0E0E0", color: "#000000" };
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const invoices = data?.invoices || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#E0E0E0] rounded-lg p-6"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <FaFileInvoice className="w-5 h-5" style={{ color: "#000080" }} />
          </div>
          <h2
            className="text-xl font-bold"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Invoices
          </h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/invoices")}
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
            <tr className="border-b border-[#E0E0E0]">
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080", fontFamily: "Poppins, sans-serif" }}
              >
                Invoice #
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080", fontFamily: "Poppins, sans-serif" }}
              >
                Fee Types
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080", fontFamily: "Poppins, sans-serif" }}
              >
                Amount
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080", fontFamily: "Poppins, sans-serif" }}
              >
                Due Date
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080", fontFamily: "Poppins, sans-serif" }}
              >
                Status
              </th>
              <th
                className="text-left py-3 px-4 text-sm font-medium"
                style={{ color: "#808080", fontFamily: "Poppins, sans-serif" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.slice(0, 5).map((invoice: Invoice, index: number) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-[#E0E0E0] hover:bg-[#F5F5F5] transition-colors"
              >
                <td className="py-4 px-4">
                  <p className="text-sm font-medium" style={{ color: "#000080" }}>
                    {invoice.invoiceNumber}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm" style={{ color: "#333333" }}>
                    {invoice.feeTypes.join(", ")}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    ${invoice.amount.toFixed(2)}
                  </p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="w-3 h-3" style={{ color: "#808080" }} />
                    <p className="text-sm" style={{ color: "#666666" }}>
                      {invoice.dueDate}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={getStatusStyle(invoice.status)}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => router.push(`/invoices/${invoice.id}`)}
                      className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      aria-label="View invoice"
                    >
                      <FaEye className="w-4 h-4" style={{ color: "#000080" }} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        // TODO: Implement download functionality
                        console.log("Download invoice:", invoice.id);
                      }}
                      className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      aria-label="Download invoice"
                    >
                      <FaDownload className="w-4 h-4" style={{ color: "#000080" }} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {invoices.slice(0, 5).map((invoice: Invoice, index: number) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="border border-[#E0E0E0] rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium" style={{ color: "#000080" }}>
                  {invoice.invoiceNumber}
                </p>
                <p className="text-xs mt-1" style={{ color: "#808080" }}>
                  {invoice.feeTypes.join(", ")}
                </p>
              </div>
              <span
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={getStatusStyle(invoice.status)}
              >
                {invoice.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-lg font-bold"
                  style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                >
                  ${invoice.amount.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <FaCalendar className="w-3 h-3" style={{ color: "#808080" }} />
                  <p className="text-xs" style={{ color: "#666666" }}>
                    Due: {invoice.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => router.push(`/invoices/${invoice.id}`)}
                  className="p-2 hover:bg-[#F5F5F5] rounded-lg"
                >
                  <FaEye className="w-4 h-4" style={{ color: "#000080" }} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    console.log("Download invoice:", invoice.id);
                  }}
                  className="p-2 hover:bg-[#F5F5F5] rounded-lg"
                >
                  <FaDownload className="w-4 h-4" style={{ color: "#000080" }} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {invoices.length === 0 && (
        <div className="text-center py-12">
          <FaFileInvoice
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "#E0E0E0" }}
          />
          <p className="text-sm" style={{ color: "#808080" }}>
            No invoices available
          </p>
        </div>
      )}
    </motion.div>
  );
}


