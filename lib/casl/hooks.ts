"use client";

import { useMemo } from "react";
import { useUserStore } from "@/stores/userStore";
import { defineAbilityFor, createEmptyAbility } from "./abilities";
import type { AppAbility, PayngAction, PayngSubjectType } from "./types";

/**
 * Get the current user's ability instance
 * This hook automatically updates when user or students change
 * Uses the ability from the user store for consistency
 */
export function useAbility(): AppAbility {
  const { user, students, ability } = useUserStore();

  // Return stored ability if available, otherwise compute it
  return useMemo(() => {
    if (!user) {
      return createEmptyAbility();
    }
    // Use stored ability if it exists and user/students haven't changed
    // Otherwise compute fresh ability
    return ability && ability.rules.length > 0
      ? ability
      : defineAbilityFor(user, students);
  }, [user, students, ability]);
}

/**
 * Check if the current user can perform an action on a subject
 * @param action - The action to check
 * @param subject - The subject type or instance
 * @param conditions - Optional conditions for scoped access
 * @returns boolean indicating if the action is allowed
 */
export function useCan(
  action: PayngAction,
  subject: PayngSubjectType | "all" | string,
  conditions?: Record<string, any>
): boolean {
  const ability = useAbility();

  return useMemo(() => {
    if (typeof subject === "string") {
      return ability.can(action, subject as any);
    }
    if (conditions) {
      return ability.can(action, { ...subject, ...conditions } as any);
    }
    return ability.can(action, subject as any);
  }, [ability, action, subject, conditions]);
}

/**
 * Check if the current user cannot perform an action on a subject
 * Inverse of useCan
 */
export function useCannot(
  action: PayngAction,
  subject: PayngSubjectType | "all" | string,
  conditions?: Record<string, any>
): boolean {
  const can = useCan(action, subject, conditions);
  return !can;
}

/**
 * Get ability for a specific user (useful for admin views)
 * @param user - The user to get ability for
 * @param students - Optional linked students for the user
 * @returns Ability instance for the specified user
 */
export function useAbilityFor(
  user: import("@/stores/userStore").User | null,
  students: import("@/stores/userStore").Student[] = []
): AppAbility {
  return useMemo(() => {
    if (!user) {
      return createEmptyAbility();
    }
    return defineAbilityFor(user, students);
  }, [user, students]);
}

/**
 * Hook that provides both ability and convenience checks
 * Useful when you need multiple permission checks in a component
 */
export function usePermissions() {
  const ability = useAbility();
  const { user, students } = useUserStore();

  return useMemo(
    () => ({
      ability,
      user,
      students,
      can: (action: PayngAction, subject: PayngSubjectType | "all" | string, conditions?: Record<string, any>) => {
        if (typeof subject === "string") {
          return ability.can(action, subject as any);
        }
        if (conditions) {
          return ability.can(action, { ...subject, ...conditions } as any);
        }
        return ability.can(action, subject as any);
      },
      cannot: (action: PayngAction, subject: PayngSubjectType | "all" | string, conditions?: Record<string, any>) => {
        if (typeof subject === "string") {
          return ability.cannot(action, subject as any);
        }
        if (conditions) {
          return ability.cannot(action, { ...subject, ...conditions } as any);
        }
        return ability.cannot(action, subject as any);
      },
    }),
    [ability, user, students]
  );
}

