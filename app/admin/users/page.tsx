"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaSearch, FaFilter } from "react-icons/fa";

export default function UsersPage() {
  const [users] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "parent",
      status: "active",
      createdAt: "2024-01-15",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          All Users
        </h1>

        <div className="bg-white rounded-lg p-4 mb-6 flex gap-4" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="flex-1 flex items-center gap-2">
            <FaSearch className="w-5 h-5" style={{ color: "#808080" }} />
            <input
              type="text"
              placeholder="Search users..."
              className="flex-1 px-4 py-2 border-none outline-none"
            />
          </div>
          <button
            className="px-4 py-2 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 flex items-center gap-2"
            style={{ color: "#000080" }}
          >
            <FaFilter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E0E0E0] bg-gray-50">
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    User
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Email
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Role
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Status
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#000080" }}
                        >
                          <FaUser className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {user.email}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

