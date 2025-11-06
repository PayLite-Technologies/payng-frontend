// ============================================================================
// FILE: /lib/api.ts
// API client with Axios
// ============================================================================

import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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

export async function fetchDashboardData(studentId?: string) {
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
