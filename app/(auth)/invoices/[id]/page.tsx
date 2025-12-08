"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFileInvoice, FaDownload, FaPrint, FaArrowLeft, FaCreditCard } from "react-icons/fa";
import Link from "next/link";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch invoice by ID
    setTimeout(() => {
      setInvoice({
        id,
        reference: "INV-2024-001",
        studentName: "Emma Wilson",
        institutionName: "Sample School",
        amount: 50000,
        currency: "NGN",
        status: "pending",
        dueDate: "2024-12-31",
        items: [
          { description: "Tuition Fee", amount: 40000 },
          { description: "Library Fee", amount: 5000 },
          { description: "Sports Fee", amount: 5000 },
        ],
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000080] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#000080" }}>
            Invoice Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg text-white"
            style={{ backgroundColor: "#000080" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline"
          style={{ color: "#000080" }}
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                Invoice
              </h1>
              <p className="text-sm" style={{ color: "#808080" }}>
                Reference: {invoice.reference}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                style={{ color: "#000080" }}
              >
                <FaPrint className="w-4 h-4" />
              </button>
              <button
                className="px-4 py-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors"
                style={{ color: "#000080" }}
              >
                <FaDownload className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3
                className="font-bold mb-2"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                Bill To
              </h3>
              <p style={{ color: "#333333" }}>{invoice.studentName}</p>
              <p className="text-sm" style={{ color: "#808080" }}>
                {invoice.institutionName}
              </p>
            </div>
            <div>
              <h3
                className="font-bold mb-2"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                Invoice Details
              </h3>
              <p className="text-sm" style={{ color: "#808080" }}>
                Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
              </p>
              <div className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : invoice.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0]">
                  <th className="text-left py-3" style={{ color: "#000080" }}>
                    Description
                  </th>
                  <th className="text-right py-3" style={{ color: "#000080" }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-[#E0E0E0]">
                    <td className="py-3" style={{ color: "#333333" }}>
                      {item.description}
                    </td>
                    <td className="text-right py-3" style={{ color: "#333333" }}>
                      {invoice.currency} {item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    className="py-3 font-bold"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    Total
                  </td>
                  <td
                    className="text-right py-3 font-bold text-xl"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    {invoice.currency} {invoice.amount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Button */}
          {invoice.status === "pending" && (
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-[24px] text-white font-medium flex items-center gap-2 mx-auto"
                style={{
                  backgroundColor: "#000080",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <FaCreditCard className="w-5 h-5" />
                Pay Now
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

