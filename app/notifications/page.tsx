"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaShieldAlt,
} from "react-icons/fa";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import RoleGate from "@/components/auth/RoleGate";
import { useUserStore } from "@/stores/userStore";
import { fetchNotifications, type NotificationItem } from "@/lib/api";

const statusMap: Record<
  NotificationItem["status"],
  { icon: JSX.Element; background: string; border: string; text: string }
> = {
  info: {
    icon: <FaInfoCircle className="text-blue-600" />,
    background: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-900",
  },
  warning: {
    icon: <FaExclamationTriangle className="text-amber-600" />,
    background: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-900",
  },
  critical: {
    icon: <FaShieldAlt className="text-red-600" />,
    background: "bg-red-50",
    border: "border-red-100",
    text: "text-red-900",
  },
};

export default function NotificationsPage() {
  const { currentRole } = useUserStore();
  const role = currentRole();

  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notifications", role],
    queryFn: () => fetchNotifications(role),
    enabled: role !== "anonymous",
  });

  useEffect(() => {
    if (!notifications.length) return;
    const critical = notifications.find((notif) => notif.status === "critical");
    if (critical) {
      toast.error(critical.title, {
        description: critical.description,
      });
    }
  }, [notifications]);

  return (
    <RoleGate allow="authenticated">
      <DashboardLayout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <FaBell className="text-[#000080]" />
              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
                >
                  Notifications
                </h1>
                <p className="text-sm text-gray-500">
                  Shared inbox with role-filtered alerts and escalations.
                </p>
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: "#000080" }}
            >
              Refresh
            </button>
          </motion.div>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center border border-dashed border-gray-300 rounded-2xl p-10"
            >
              <FaCheckCircle className="text-3xl text-emerald-500 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No notifications for your role right now.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => {
                const status = statusMap[notification.status];
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border ${status.border} ${status.background} rounded-2xl p-5 space-y-2`}
                  >
                    <div className="flex items-start gap-3">
                      {status.icon}
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h2 className={`text-base font-semibold ${status.text}`}>
                            {notification.title}
                          </h2>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                    </div>
                    {notification.actionable && (
                      <button
                        className="text-xs font-medium text-[#000080] underline"
                        onClick={() =>
                          toast.info("Action queued", {
                            description: "Feature coming soon.",
                          })
                        }
                      >
                        View details
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </DashboardLayout>
    </RoleGate>
  );
}

