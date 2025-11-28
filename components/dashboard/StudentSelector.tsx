"use client";

import { motion } from "framer-motion";
import { FaUserGraduate, FaChevronDown } from "react-icons/fa";
import { useUserStore } from "@/stores/userStore";

export default function StudentSelector() {
  const { students, selectedStudent, setSelectedStudent } = useUserStore();

  if (!students || students.length === 0) {
    return null;
  }

  // If only one student, show as a card instead of selector
  if (students.length === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div
          className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <FaUserGraduate className="w-6 h-6" style={{ color: "#90EE90" }} />
          </div>
          <div>
            <p
              className="font-semibold"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              {students[0].name}
            </p>
            <p className="text-sm" style={{ color: "#808080" }}>
              {students[0].grade} • {students[0].studentId}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: "#666666", fontFamily: "Inter, sans-serif" }}
      >
        Select Student
      </label>
      <div className="relative">
        <select
          value={selectedStudent?.id || ""}
          onChange={(e) => {
            const student = students.find((s) => s.id === e.target.value);
            if (student) setSelectedStudent(student);
          }}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none transition-all duration-300"
          style={{
            color: "#333333",
            fontFamily: "Inter, sans-serif",
            borderColor: "#E0E0E0",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
          onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
        >
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name} - {student.grade} ({student.studentId})
            </option>
          ))}
        </select>
        <FaChevronDown
          className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          style={{ color: "#808080" }}
        />
      </div>
    </motion.div>
  );
}
