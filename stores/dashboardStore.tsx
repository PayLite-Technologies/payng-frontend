import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Student {
  id: string;
  name: string;
  grade: string;
  studentId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardData {
  fees: any;
  recentPayments: any[];
}

interface DashboardStore {
  user: User | null;
  students: Student[];
  selectedStudent: Student | null;
  dashboardData: DashboardData | null;
  setUser: (user: User) => void;
  setStudents: (students: Student[]) => void;
  setSelectedStudent: (student: Student) => void;
  setDashboardData: (data: DashboardData) => void;
  clearStore: () => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      user: null,
      students: [],
      selectedStudent: null,
      dashboardData: null,
      setUser: (user) => set({ user }),
      setStudents: (students) =>
        set({ students, selectedStudent: students[0] || null }),
      setSelectedStudent: (student) => set({ selectedStudent: student }),
      setDashboardData: (data) => set({ dashboardData: data }),
      clearStore: () =>
        set({
          user: null,
          students: [],
          selectedStudent: null,
          dashboardData: null,
        }),
    }),
    {
      name: "payng-dashboard-storage",
    }
  )
);
