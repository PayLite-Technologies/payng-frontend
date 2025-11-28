"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FeeSummaryCard from "@/components/dashboard/FeeSummaryCard";
import RecentPayments from "@/components/dashboard/RecentPayments";
import QuickActions from "@/components/dashboard/QuickActions";
import StudentSelector from "@/components/dashboard/StudentSelector";
import { useDashboardStore } from "@/stores/dashboardStore";
import { fetchDashboardData } from "@/lib/api";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

export default function DashboardPage() {
  const { user, selectedStudent, setDashboardData } = useDashboardStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", selectedStudent?.id],
    queryFn: () => fetchDashboardData(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setDashboardData(data);

      // Check for overdue fees and show notification
      if (data.fees.overdueFees > 0) {
        toast.error("You have overdue fees", {
          description: `Total overdue: $${data.fees.overdueFees.toFixed(2)}`,
          duration: 5000,
        });
      }
    }
  }, [data, setDashboardData]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load dashboard data", {
        description: "Please refresh the page or contact support",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <SkeletonLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
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
            Welcome back, {user?.name || "Guardian"}
          </h1>
          <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
            Manage your student&apos;s fees and payments in one place
          </p>
        </motion.div>

        {/* Student Selector */}
        <StudentSelector />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Fee Summary - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <FeeSummaryCard
              fees={data?.fees}
              studentName={selectedStudent?.name}
            />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Payments */}
        <RecentPayments payments={data?.recentPayments || []} />
      </div>
    </DashboardLayout>
  );
}
