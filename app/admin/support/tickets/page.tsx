"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaTicketAlt, FaSearch, FaFilter } from "react-icons/fa";

export default function SupportTicketsPage() {
  const [tickets] = useState([
    {
      id: "1",
      subject: "Payment not reflecting",
      user: "john@example.com",
      status: "open",
      priority: "high",
      createdAt: "2024-11-15",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Support Tickets
        </h1>

        <div className="bg-white rounded-lg p-4 mb-6 flex gap-4" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <div className="flex-1 flex items-center gap-2">
            <FaSearch className="w-5 h-5" style={{ color: "#808080" }} />
            <input
              type="text"
              placeholder="Search tickets..."
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
                    Ticket
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    User
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Status
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Priority
                  </th>
                  <th className="text-left py-4 px-6" style={{ color: "#000080" }}>
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-[#E0E0E0] hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <FaTicketAlt className="w-4 h-4" style={{ color: "#808080" }} />
                        <span className="font-medium" style={{ color: "#333333" }}>
                          {ticket.subject}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {ticket.user}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          ticket.status === "open"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          ticket.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6" style={{ color: "#808080" }}>
                      {new Date(ticket.createdAt).toLocaleDateString()}
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

