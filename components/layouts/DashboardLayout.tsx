"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaHome,
  FaWallet,
  FaHistory,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaFileInvoice,
  FaCalendarAlt,
  FaUniversity,
  FaChartLine,
} from "react-icons/fa";
import clsx from "clsx";
import { useUserStore } from "@/stores/userStore";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, logout, isParent, isStudent, isInstitutionAdmin, isSuperAdmin, isFinance, isSupport, isMerchant } = useUserStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Role-based navigation items
  const getNavItems = () => {
    if (isParent()) {
      return [
        { label: "Dashboard", icon: FaHome, href: "/dashboard" },
        { label: "Students", icon: FaUser, href: "/students" },
        { label: "Invoices", icon: FaFileInvoice, href: "/invoices" },
        { label: "Payments", icon: FaWallet, href: "/payments" },
        { label: "Payment Plans", icon: FaCalendarAlt, href: "/payment-plans" },
        { label: "History", icon: FaHistory, href: "/payment-history" },
        { label: "Profile", icon: FaUser, href: "/profile" },
      ];
    }
    if (isStudent()) {
      return [
        { label: "Dashboard", icon: FaHome, href: "/dashboard" },
        { label: "Fees", icon: FaFileInvoice, href: "/invoices" },
        { label: "History", icon: FaHistory, href: "/payment-history" },
        { label: "Profile", icon: FaUser, href: "/profile" },
      ];
    }
    if (isInstitutionAdmin()) {
      return [
        { label: "Dashboard", icon: FaHome, href: "/dashboard" },
        { label: "Students", icon: FaUser, href: "/students" },
        { label: "Invoices", icon: FaFileInvoice, href: "/invoices" },
        { label: "Fee Structure", icon: FaCog, href: "/admin/fee-structure" },
        { label: "Fee Assignments", icon: FaCog, href: "/admin/fee-assignments" },
        { label: "Reconciliation", icon: FaWallet, href: "/admin/reconciliation" },
        { label: "Reports", icon: FaChartLine, href: "/admin/reports" },
        { label: "Profile", icon: FaUser, href: "/profile" },
      ];
    }
    if (isSuperAdmin()) {
      return [
        { label: "Dashboard", icon: FaHome, href: "/dashboard" },
        { label: "Institutions", icon: FaUniversity, href: "/institutions" },
        { label: "Users", icon: FaUser, href: "/admin/users" },
        { label: "Staff", icon: FaCog, href: "/admin/staff" },
        { label: "Reports", icon: FaChartLine, href: "/reports" },
        { label: "Profile", icon: FaUser, href: "/profile" },
      ];
    }
    if (isFinance() || isSupport() || isMerchant()) {
      return [
        { label: "Dashboard", icon: FaHome, href: "/dashboard" },
        { label: "Reconciliation", icon: FaWallet, href: "/admin/reconciliation" },
        { label: "Reports", icon: FaChartLine, href: "/admin/reports" },
        { label: "Profile", icon: FaUser, href: "/profile" },
      ];
    }
    return [
      { label: "Dashboard", icon: FaHome, href: "/dashboard" },
      { label: "Profile", icon: FaUser, href: "/profile" },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 max-h-screen lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        {/* Logo */}
        <div className="p-6 relative border-b border-gray-200 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#000080" }}
              >
                <FaWallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2
                  className="text-lg font-semibold"
                  style={{
                    color: "#000080",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Payng
                </h2>
                <p className="text-xs" style={{ color: "#808080" }}>
                  School Payments
                </p>
              </div>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <FaTimes className="w-5 h-5" style={{ color: "#808080" }} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                typeof window !== "undefined" &&
                window.location.pathname === item.href;

              return (
                <motion.button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(
                    "w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-all duration-300",
                    isActive ? "bg-gray-100" : "hover:bg-gray-50"
                  )}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isActive ? "#000080" : "#808080" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: isActive ? "#000080" : "#808080",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
          >
            <FaSignOutAlt className="w-5 h-5" style={{ color: "#808080" }} />
            <span
              className="text-sm font-medium"
              style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}
            >
              Logout
            </span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div
            className="px-4 sm:px-6 lg:px-8 py-4"
            style={{
              background: "linear-gradient(135deg, #000080 0%, #001F3F 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <button
                className="lg:hidden text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars className="w-6 h-6" />
              </button>

              <div className="flex-1 lg:flex-none" />

              <div className="flex items-center gap-4">
                <button className="relative text-white">
                  <FaBell className="w-5 h-5" />
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-medium"
                    style={{ backgroundColor: "#90EE90", color: "#000000" }}
                  >
                    3
                  </span>
                </button>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white"
                    style={{ backgroundColor: "#808080" }}
                  >
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="hidden md:block">
                    <p
                      className="text-sm font-medium text-white"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-300">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
