import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PayngRole } from "@/types/roles";
import { defineAbilityFor, createEmptyAbility } from "@/lib/casl/abilities";
import type { AppAbility } from "@/lib/casl/types";

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
  // CASL integration
  getAbility: () => AppAbility;
  ability: AppAbility;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => {
      // Helper to compute ability
      const computeAbility = (): AppAbility => {
        const user = get().user;
        const students = get().students;
        if (!user) {
          return createEmptyAbility();
        }
        return defineAbilityFor(user, students);
      };

      return {
        user: null,
        students: [],
        selectedStudent: null,
        isAuthenticated: false,
        ability: createEmptyAbility(),

        currentRole: () => get().user?.role || "anonymous",

        setUser: (user) => {
          const students = get().students;
          set({
            user,
            isAuthenticated: true,
            selectedStudent: null,
            ability: defineAbilityFor(user, students),
          });
        },

        updateUser: (updates) => {
          set((state) => {
            if (!state.user) return {};
            const updatedUser = {
              ...state.user,
              ...updates,
            };
            return {
              user: updatedUser,
              ability: defineAbilityFor(updatedUser, state.students),
            };
          });
        },

        setStudents: (students) => {
          const user = get().user;
          set({
            students,
            selectedStudent: students[0] || null,
            ability: user ? defineAbilityFor(user, students) : createEmptyAbility(),
          });
        },

        setSelectedStudent: (student) => set({ selectedStudent: student }),

        logout: () =>
          set({
            user: null,
            students: [],
            selectedStudent: null,
            isAuthenticated: false,
            ability: createEmptyAbility(),
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

        // CASL integration
        getAbility: () => {
          return computeAbility();
        },
      };
    },
    {
      name: "payng-user-storage",
      // Don't persist ability, compute it on load
      partialize: (state) => ({
        user: state.user,
        students: state.students,
        selectedStudent: state.selectedStudent,
        isAuthenticated: state.isAuthenticated,
      }),
      // Recompute ability on rehydrate
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.ability = state.user
            ? defineAbilityFor(state.user, state.students)
            : createEmptyAbility();
        }
      },
    }
  )
);


