"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import type { PayngRole } from "@/types/roles";
import { useAbility } from "@/lib/casl/hooks";
import type { PayngAction, PayngSubjectType } from "@/lib/casl/types";

type RoleGateAllow = "any" | "authenticated" | PayngRole[];

interface RoleGateProps {
  allow?: RoleGateAllow;
  allowAnonymous?: boolean;
  redirectTo?: string;
  unauthorizedRedirectTo?: string;
  loadingFallback?: React.ReactNode;
  unauthorizedFallback?: React.ReactNode;
  children: React.ReactNode;
  /**
   * Sections that should not redirect can opt out (e.g. inline role reveals)
   */
  suppressRedirect?: boolean;
  /**
   * CASL-based permission check (alternative to role-based allow)
   * If provided, this takes precedence over role-based checks
   */
  ability?: boolean | (() => boolean);
  /**
   * CASL action and subject for permission check
   * Used when ability is not provided as a function
   */
  action?: PayngAction;
  subject?: PayngSubjectType | "all" | string;
  conditions?: Record<string, any>;
}

export function RoleGate({
  allow = "authenticated",
  allowAnonymous = false,
  redirectTo = "/login",
  unauthorizedRedirectTo = "/dashboard",
  loadingFallback = null,
  unauthorizedFallback = null,
  suppressRedirect = false,
  children,
  ability: abilityCheck,
  action,
  subject,
  conditions,
}: RoleGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, currentRole } = useUserStore();
  const caslAbility = useAbility();
  const role = currentRole();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  // CASL-based permission check (takes precedence)
  const caslCanAccess = useMemo(() => {
    if (abilityCheck !== undefined) {
      if (typeof abilityCheck === "function") {
        return abilityCheck();
      }
      return abilityCheck;
    }

    if (action && subject) {
      if (typeof subject === "string") {
        return caslAbility.can(action, subject as any);
      }
      if (conditions) {
        return caslAbility.can(action, { ...subject, ...conditions } as any);
      }
      return caslAbility.can(action, subject as any);
    }

    return null; // No CASL check provided
  }, [abilityCheck, action, subject, conditions, caslAbility]);

  // Role-based permission check (fallback if no CASL check)
  const roleCanAccess = useMemo(() => {
    if (allow === "any") {
      return true;
    }

    if (allow === "authenticated") {
      if (isAuthenticated) return true;
      return allowAnonymous && role === "anonymous";
    }

    if (Array.isArray(allow)) {
      if (allow.includes(role)) return true;
      if (role === "anonymous") {
        return allowAnonymous && allow.includes("anonymous");
      }
    }

    return false;
  }, [allow, allowAnonymous, isAuthenticated, role]);

  // Use CASL check if provided, otherwise fall back to role check
  const canAccess = caslCanAccess !== null ? caslCanAccess : roleCanAccess;

  useEffect(() => {
    if (!ready || suppressRedirect) {
      return;
    }

    if (!canAccess) {
      if (!isAuthenticated && !allowAnonymous) {
        const url = new URL(redirectTo, window.location.origin);
        url.searchParams.set("redirect", pathname);
        router.replace(url.toString());
      } else {
        const url = new URL(unauthorizedRedirectTo, window.location.origin);
        url.searchParams.set("denied", pathname);
        router.replace(url.toString());
      }
    }
  }, [
    allowAnonymous,
    canAccess,
    isAuthenticated,
    pathname,
    ready,
    redirectTo,
    router,
    suppressRedirect,
    unauthorizedRedirectTo,
  ]);

  if (!ready) {
    return <>{loadingFallback}</>;
  }

  if (!canAccess) {
    return <>{unauthorizedFallback}</>;
  }

  return <>{children}</>;
}

export default RoleGate;

