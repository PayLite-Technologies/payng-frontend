"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import type { PayngRole } from "@/types/roles";

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
}: RoleGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, currentRole } = useUserStore();
  const role = currentRole();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const canAccess = useMemo(() => {
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

