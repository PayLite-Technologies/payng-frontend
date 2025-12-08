"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaBell, FaShieldAlt, FaKey } from "react-icons/fa";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Settings
        </h1>

        <div className="space-y-6">
          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="w-6 h-6" style={{ color: "#000080" }} />
              <h2
                className="text-xl font-bold"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                Security
              </h2>
            </div>
            <div className="space-y-4">
              <button
                className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 text-left transition-colors flex items-center justify-between"
                style={{ color: "#000080" }}
              >
                <div className="flex items-center gap-3">
                  <FaLock className="w-5 h-5" />
                  <span>Change Password</span>
                </div>
                <span className="text-sm" style={{ color: "#808080" }}>
                  →
                </span>
              </button>
              <button
                className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] hover:bg-gray-50 text-left transition-colors flex items-center justify-between"
                style={{ color: "#000080" }}
              >
                <div className="flex items-center gap-3">
                  <FaKey className="w-5 h-5" />
                  <span>Two-Factor Authentication</span>
                </div>
                <span className="text-sm" style={{ color: "#808080" }}>
                  →
                </span>
              </button>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaBell className="w-6 h-6" style={{ color: "#000080" }} />
              <h2
                className="text-xl font-bold"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-gray-50">
                <span style={{ color: "#333333" }}>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications({ ...notifications, email: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#000080" }}
                />
              </label>
              <label className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-gray-50">
                <span style={{ color: "#333333" }}>SMS Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) =>
                    setNotifications({ ...notifications, sms: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#000080" }}
                />
              </label>
              <label className="flex items-center justify-between p-4 border border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-gray-50">
                <span style={{ color: "#333333" }}>Push Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) =>
                    setNotifications({ ...notifications, push: e.target.checked })
                  }
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#000080" }}
                />
              </label>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Account
            </h2>
            <div className="space-y-4">
              <button
                className="w-full px-4 py-3 rounded-lg border border-red-200 hover:bg-red-50 text-left transition-colors"
                style={{ color: "#FF6B6B" }}
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

