"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEdit, FaBuilding } from "react-icons/fa";
import Link from "next/link";

export default function InstitutionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [institution, setInstitution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch institution by ID
    setTimeout(() => {
      setInstitution({
        id,
        name: "Sample School",
        type: "Primary",
        location: "Lagos, Nigeria",
        email: "admin@sample.edu",
        phone: "+234 800 123 4567",
        students: 500,
        status: "active",
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/institutions"
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:underline"
          style={{ color: "#000080" }}
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Institutions
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#000080" }}
            >
              <FaBuilding className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                {institution.name}
              </h1>
              <p className="text-sm" style={{ color: "#808080" }}>
                {institution.type}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between p-4 border border-[#E0E0E0] rounded-lg">
              <span className="text-sm" style={{ color: "#666666" }}>
                Location:
              </span>
              <span className="font-medium" style={{ color: "#333333" }}>
                {institution.location}
              </span>
            </div>
            <div className="flex justify-between p-4 border border-[#E0E0E0] rounded-lg">
              <span className="text-sm" style={{ color: "#666666" }}>
                Email:
              </span>
              <span className="font-medium" style={{ color: "#333333" }}>
                {institution.email}
              </span>
            </div>
            <div className="flex justify-between p-4 border border-[#E0E0E0] rounded-lg">
              <span className="text-sm" style={{ color: "#666666" }}>
                Phone:
              </span>
              <span className="font-medium" style={{ color: "#333333" }}>
                {institution.phone}
              </span>
            </div>
            <div className="flex justify-between p-4 border border-[#E0E0E0] rounded-lg">
              <span className="text-sm" style={{ color: "#666666" }}>
                Students:
              </span>
              <span className="font-medium" style={{ color: "#333333" }}>
                {institution.students}
              </span>
            </div>
            <div className="flex justify-between p-4 border border-[#E0E0E0] rounded-lg">
              <span className="text-sm" style={{ color: "#666666" }}>
                Status:
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  institution.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {institution.status}
              </span>
            </div>
          </div>

          <button
            className="w-full px-6 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            style={{ color: "#000080" }}
          >
            <FaEdit className="w-4 h-4" />
            Edit Institution
          </button>
        </motion.div>
      </div>
    </div>
  );
}

