import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PayngRole } from "@/types/roles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: PayngRole;
  phoneNumber?: string;
  profileImageUrl?: string;
  adminLevel?: "institution" | "platform" | "support" | "finance" | "merchant";
  parentUserIds?: string[];
  publicProfile?: boolean;
  institutionId?: string; // For institution admins
  institutionName?: string;
  permissions?: string[];
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  studentId: string;
  institutionId: string;
  parentId?: string; // If linked to a parent
}

interface UserStore {
  user: User | null;
  students: Student[]; // For parents: their children; for students: themselves
  selectedStudent: Student | null;
  isAuthenticated: boolean;
  currentRole: () => PayngRole;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  setStudents: (students: Student[]) => void;
  setSelectedStudent: (student: Student) => void;
  logout: () => void;
  // Role check helpers
  isParent: () => boolean;
  isGuardian: () => boolean;
  isStudent: () => boolean;
  isInstitutionAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  isSupport: () => boolean;
  isFinance: () => boolean;
  isMerchant: () => boolean;
  isAnonymous: () => boolean;
  hasRole: (role: PayngRole | PayngRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      students: [],
      selectedStudent: null,
      isAuthenticated: false,

      currentRole: () => get().user?.role || "anonymous",

      setUser: (user) =>
        set({ user, isAuthenticated: true, selectedStudent: null }),

      updateUser: (updates) =>
        set((state) =>
          state.user
            ? {
                user: {
                  ...state.user,
                  ...updates,
                },
              }
            : {}
        ),

      setStudents: (students) =>
        set({
          students,
          selectedStudent: students[0] || null,
        }),

      setSelectedStudent: (student) => set({ selectedStudent: student }),

      logout: () =>
        set({
          user: null,
          students: [],
          selectedStudent: null,
          isAuthenticated: false,
        }),

      // Role check helpers
      isParent: () => get().user?.role === "parent",
      isGuardian: () => get().user?.role === "guardian",
      isStudent: () => get().user?.role === "student",
      isInstitutionAdmin: () => get().user?.role === "institution_admin",
      isSuperAdmin: () => get().user?.role === "super_admin",
      isSupport: () => get().user?.role === "support",
      isFinance: () => get().user?.role === "finance",
      isMerchant: () => get().user?.role === "merchant",
      isAnonymous: () => !get().user,

      hasRole: (role) => {
        const userRole = get().user?.role || "anonymous";
        if (!userRole) return false;
        return Array.isArray(role)
          ? role.includes(userRole as PayngRole)
          : userRole === role;
      },

      hasPermission: (permission) => {
        const user = get().user;
        if (!user) return false;
        // Super admin has all permissions
        if (user.role === "super_admin") return true;
        return user.permissions?.includes(permission) || false;
      },
    }),
    {
      name: "payng-user-storage",
    }
  )
);


