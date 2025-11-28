// ============================================================================
// FILE: /lib/api.ts
// API client with Axios
// ============================================================================

import axios from "axios";
import type { PayngRole } from "@/types/roles";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getFromStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = getFromStorage("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const role = getFromStorage("payng-role");
    if (role) {
      config.headers["x-user-role"] = role;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function fetchDashboardData() {
  // Mock data for development - replace with actual API call
  return {
    fees: {
      total: 2500.0,
      paid: 1500.0,
      outstanding: 1000.0,
      overdueFees: 200.0,
      breakdown: [
        {
          category: "Tuition Fee",
          amount: 1200.0,
          dueDate: "2024-11-01",
          status: "pending" as const,
        },
        {
          category: "Lab Fee",
          amount: 300.0,
          dueDate: "2024-10-15",
          status: "paid" as const,
        },
        {
          category: "Sports Fee",
          amount: 200.0,
          dueDate: "2024-09-30",
          status: "overdue" as const,
        },
        {
          category: "Library Fee",
          amount: 150.0,
          dueDate: "2024-10-20",
          status: "paid" as const,
        },
        {
          category: "Annual Fee",
          amount: 650.0,
          dueDate: "2024-11-15",
          status: "pending" as const,
        },
      ],
    },
    recentPayments: [
      {
        id: "PAY-001",
        amount: 300.0,
        date: "2024-10-15",
        status: "completed" as const,
        method: "Credit Card",
        reference: "REF-20241015-001",
      },
      {
        id: "PAY-002",
        amount: 150.0,
        date: "2024-10-10",
        status: "completed" as const,
        method: "Bank Transfer",
        reference: "REF-20241010-002",
      },
      {
        id: "PAY-003",
        amount: 500.0,
        date: "2024-10-05",
        status: "pending" as const,
        method: "Mobile Money",
        reference: "REF-20241005-003",
      },
      {
        id: "PAY-004",
        amount: 250.0,
        date: "2024-09-28",
        status: "completed" as const,
        method: "Credit Card",
        reference: "REF-20240928-004",
      },
      {
        id: "PAY-005",
        amount: 300.0,
        date: "2024-09-20",
        status: "failed" as const,
        method: "Credit Card",
        reference: "REF-20240920-005",
      },
    ],
  };

  // Uncomment for actual API call
  // const response = await apiClient.get(`/dashboard${studentId ? `?studentId=${studentId}` : ''}`);
  // return response.data;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  status: "info" | "warning" | "critical";
  createdAt: string;
  roleTarget: string;
  actionable?: boolean;
}

export async function fetchNotifications(role: PayngRole): Promise<NotificationItem[]> {
  if (role === "anonymous") {
    return [];
  }

  // Mock notifications tailored per role
  const baseNotifications: Record<PayngRole, NotificationItem[]> = {
    parent: [
      {
        id: "notif-parent-1",
        title: "Fees Due",
        description: "Emma’s tuition balance is due in 3 days.",
        status: "warning",
        createdAt: new Date().toISOString(),
        roleTarget: "parent",
        actionable: true,
      },
    ],
    guardian: [
      {
        id: "notif-guardian-1",
        title: "Link Student",
        description: "Complete verification to link Michael to your profile.",
        status: "info",
        createdAt: new Date().toISOString(),
        roleTarget: "guardian",
        actionable: true,
      },
    ],
    student: [
      {
        id: "notif-student-1",
        title: "Payment Confirmed",
        description: "Your library fee has been cleared.",
        status: "info",
        createdAt: new Date().toISOString(),
        roleTarget: "student",
      },
    ],
    institution_admin: [
      {
        id: "notif-inst-1",
        title: "Pending Approvals",
        description: "5 fee schedules are awaiting your approval.",
        status: "warning",
        createdAt: new Date().toISOString(),
        roleTarget: "institution_admin",
        actionable: true,
      },
    ],
    super_admin: [
      {
        id: "notif-super-1",
        title: "Global Report Ready",
        description: "The monthly performance summary is generated.",
        status: "info",
        createdAt: new Date().toISOString(),
        roleTarget: "super_admin",
        actionable: true,
      },
    ],
    support: [
      {
        id: "notif-support-1",
        title: "Escalated Ticket",
        description: "Ticket #9234 has breached SLA.",
        status: "critical",
        createdAt: new Date().toISOString(),
        roleTarget: "support",
        actionable: true,
      },
    ],
    finance: [
      {
        id: "notif-finance-1",
        title: "Reconciliation Required",
        description: "12 payments need manual reconciliation.",
        status: "warning",
        createdAt: new Date().toISOString(),
        roleTarget: "finance",
        actionable: true,
      },
    ],
    merchant: [
      {
        id: "notif-merchant-1",
        title: "KYC Update",
        description: "Upload the latest compliance certificate.",
        status: "info",
        createdAt: new Date().toISOString(),
        roleTarget: "merchant",
        actionable: true,
      },
    ],
    anonymous: [],
  };

  return baseNotifications[role] || [];
}
