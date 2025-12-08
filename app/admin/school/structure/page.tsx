"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaGraduationCap, FaUsers, FaPlus } from "react-icons/fa";

export default function StructurePage() {
  const [structure] = useState({
    faculties: [
      {
        id: "1",
        name: "Faculty of Science",
        departments: [
          {
            id: "1",
            name: "Computer Science",
            classes: ["CS 101", "CS 201", "CS 301"],
          },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-3xl font-bold"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Institution Structure
          </h1>
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
            Add Faculty
          </motion.button>
        </div>

        <div className="space-y-6">
          {structure.faculties.map((faculty) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaBuilding className="w-6 h-6" style={{ color: "#000080" }} />
                <h2
                  className="text-xl font-bold"
                  style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                >
                  {faculty.name}
                </h2>
              </div>

              <div className="ml-9 space-y-4">
                {faculty.departments.map((dept) => (
                  <div key={dept.id} className="border-l-2 border-[#E0E0E0] pl-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FaGraduationCap className="w-5 h-5" style={{ color: "#808080" }} />
                      <h3 className="font-bold" style={{ color: "#333333" }}>
                        {dept.name}
                      </h3>
                    </div>
                    <div className="ml-8 space-y-2">
                      {dept.classes.map((cls, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <FaUsers className="w-4 h-4" style={{ color: "#808080" }} />
                          <span style={{ color: "#666666" }}>{cls}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

