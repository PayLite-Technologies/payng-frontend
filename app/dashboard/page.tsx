"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FeeSummaryCard from "@/components/dashboard/FeeSummaryCard";
import RecentPayments from "@/components/dashboard/RecentPayments";
import QuickActions from "@/components/dashboard/QuickActions";
import StudentSelector from "@/components/dashboard/StudentSelector";
import InvoiceTable from "@/components/dashboard/InvoiceTable";
import { useUserStore } from "@/stores/userStore";
import { fetchDashboardData } from "@/lib/api";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import RoleGate from "@/components/auth/RoleGate";

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    students,
    selectedStudent,
    isParent,
    isStudent,
    isInstitutionAdmin,
    isSuperAdmin,
    isFinance,
    isSupport,
    isMerchant,
  } = useUserStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", user?.id, selectedStudent?.id, user?.role],
    queryFn: () => fetchDashboardData(),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && (isParent() || isStudent())) {
      // Check for overdue fees and show notification
      if (data.fees?.overdueFees > 0) {
        toast.error("You have overdue fees", {
          description: `Total overdue: $${data.fees.overdueFees.toFixed(2)}`,
          duration: 5000,
        });
      }
    }
  }, [data, isParent, isStudent]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load dashboard data", {
        description: "Please refresh the page or contact support",
      });
    }
  }, [error]);

  if (!user) {
    return null; // Will redirect
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <SkeletonLoader />
      </DashboardLayout>
    );
  }

  // Role-based dashboard content
  const renderDashboardContent = () => {
    // Parent Dashboard
    if (isParent()) {
      return (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Welcome back, {user.name}
            </h1>
            <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
              Manage your children&apos;s fees and payments in one place
            </p>
          </motion.div>

          <StudentSelector />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <FeeSummaryCard
                fees={data?.fees}
                studentName={selectedStudent?.name}
              />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          <RecentPayments payments={data?.recentPayments || []} />
          <div className="mt-8">
            <InvoiceTable />
          </div>
        </>
      );
    }

    // Student Dashboard (read-only)
    if (isStudent()) {
      return (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Welcome, {user.name}
            </h1>
            <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
              View your fees and payment status
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <FeeSummaryCard
                fees={data?.fees}
                studentName={students[0]?.name}
              />
            </div>
          </div>

          <RecentPayments payments={data?.recentPayments || []} />
          <div className="mt-8">
            <InvoiceTable />
          </div>
        </>
      );
    }

    // Institution Admin Dashboard
    if (isInstitutionAdmin()) {
      return (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              School Overview
            </h1>
            <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
              {user.institutionName || "Manage your institution"}
            </p>
          </motion.div>

          {/* Admin Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total Students", value: "1,234", color: "#000080" },
              { title: "Active Fees", value: "₦2.5M", color: "#90EE90" },
              { title: "Pending Payments", value: "45", color: "#FFA500" },
              { title: "This Month Revenue", value: "₦850K", color: "#000080" },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-[#E0E0E0] rounded-lg p-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <p className="text-sm mb-1" style={{ color: "#808080" }}>
                  {stat.title}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: stat.color, fontFamily: "Poppins, sans-serif" }}
                >
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentPayments payments={data?.recentPayments || []} />
            <InvoiceTable />
          </div>
        </>
      );
    }

    // Super Admin / Platform Staff Dashboard
    if (isSuperAdmin() || isFinance() || isSupport() || isMerchant()) {
      return (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
            >
              Platform Overview
            </h1>
            <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
              {isSuperAdmin() && "Manage all institutions and platform"}
              {isFinance() && "Financial operations and reconciliation"}
              {isSupport() && "Support tickets and user management"}
              {isMerchant() && "Merchant operations and onboarding"}
            </p>
          </motion.div>

          {/* Platform Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: isSuperAdmin() ? "Total Institutions" : "Active Transactions",
                value: isSuperAdmin() ? "156" : "12,345",
                color: "#000080",
              },
              {
                title: "Total Revenue",
                value: "₦45.2M",
                color: "#90EE90",
              },
              {
                title: "Pending Issues",
                value: isSupport() ? "23" : "8",
                color: "#FFA500",
              },
              {
                title: "Success Rate",
                value: "98.5%",
                color: "#000080",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-[#E0E0E0] rounded-lg p-6"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <p className="text-sm mb-1" style={{ color: "#808080" }}>
                  {stat.title}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: stat.color, fontFamily: "Poppins, sans-serif" }}
                >
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentPayments payments={data?.recentPayments || []} />
            <InvoiceTable />
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <RoleGate allow="authenticated" loadingFallback={<SkeletonLoader />}>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderDashboardContent()}
        </div>
      </DashboardLayout>
    </RoleGate>
  );
}
