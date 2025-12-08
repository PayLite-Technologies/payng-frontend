"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function InstitutionsPage() {
  const [institutions] = useState([
    {
      id: "1",
      name: "Sample School",
      type: "Primary",
      location: "Lagos, Nigeria",
      students: 500,
      status: "active",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Institutions
          </h1>
          <Link href="/admin/institutions/new">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-[24px] text-white font-medium flex items-center gap-2"
              style={{
                backgroundColor: "#000080",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <FaPlus className="w-4 h-4" />
              Onboard Institution
            </motion.button>
          </Link>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="flex items-center gap-2">
            <FaSearch className="w-5 h-5" style={{ color: "#808080" }} />
            <input
              type="text"
              placeholder="Search institutions..."
              className="flex-1 px-4 py-2 border-none outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map((institution) => (
            <motion.div
              key={institution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#000080" }}
                >
                  <FaBuilding className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                  >
                    {institution.name}
                  </h3>
                  <p className="text-sm" style={{ color: "#808080" }}>
                    {institution.type}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Location:
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#333333" }}>
                    {institution.location}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Students:
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#333333" }}>
                    {institution.students}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "#666666" }}>
                    Status:
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      institution.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {institution.status}
                  </span>
                </div>
              </div>

              <Link href={`/admin/institutions/${institution.id}`}>
                <button
                  className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  style={{ color: "#000080" }}
                >
                  <FaEdit className="w-4 h-4" />
                  View Details
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

