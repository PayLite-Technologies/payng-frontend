import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_ROLES,
  AUTHENTICATED_ROLES,
  isPayngRole,
  type PayngRole,
} from "@/types/roles";

interface RouteRule {
  pattern: string;
  roles: "*" | PayngRole[];
  allowAnonymous?: boolean;
}

const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password", "/reset-password"];

const routeAccess: RouteRule[] = [
  // Shared utilities
  { pattern: "/dashboard", roles: AUTHENTICATED_ROLES },
  { pattern: "/profile", roles: AUTHENTICATED_ROLES, allowAnonymous: true },
  { pattern: "/notifications", roles: AUTHENTICATED_ROLES },
  { pattern: "/settings", roles: AUTHENTICATED_ROLES },

  // Payments & invoices
  {
    pattern: "/invoices/[id]",
    roles: ["parent", "guardian", "student", "institution_admin", "super_admin", "support", "finance"],
  },
  {
    pattern: "/invoices",
    roles: ["parent", "guardian", "student", "institution_admin", "super_admin", "support", "finance"],
  },
  {
    pattern: "/payments",
    roles: ["parent", "guardian", "institution_admin", "super_admin", "finance", "merchant"],
  },
  {
    pattern: "/payment-history",
    roles: ["parent", "guardian", "student", "institution_admin", "super_admin", "support", "finance"],
  },
  {
    pattern: "/fees",
    roles: ["student", "parent", "guardian"],
  },

  // Admin dashboards
  { pattern: "/admin/dashboard", roles: ADMIN_ROLES },
  { pattern: "/admin/reports/global", roles: ["super_admin", "finance"] },
  { pattern: "/admin/reports", roles: ADMIN_ROLES },
  { pattern: "/admin/reconciliation", roles: ["finance", "merchant", "institution_admin", "super_admin"] },
  { pattern: "/admin/fee-structure", roles: ["institution_admin", "super_admin"] },
  { pattern: "/admin/fee-schedules", roles: ["institution_admin", "super_admin"] },
  { pattern: "/admin/fee-assignments", roles: ["institution_admin", "super_admin"] },
  { pattern: "/admin/students", roles: ["institution_admin", "super_admin"] },
  { pattern: "/admin/institutions/[id]/edit", roles: ["super_admin"] },
  { pattern: "/admin/institutions", roles: ["super_admin"] },
  { pattern: "/admin/admins", roles: ["super_admin"] },
  { pattern: "/admin/support/tickets", roles: ["support", "super_admin"] },
  { pattern: "/admin/finance/transactions", roles: ["finance", "super_admin"] },
  { pattern: "/admin/merchants/onboarding", roles: ["merchant", "super_admin"] },
];

const ROLE_COOKIE = "payng-role";

function matchesRoute(pattern: string, pathname: string) {
  if (pattern.includes("[id]")) {
    const baseRoute = pattern.split("/[id]")[0];
    return pathname === baseRoute || pathname.startsWith(`${baseRoute}/`);
  }
  return pathname === pattern || pathname.startsWith(`${pattern}/`);
}

function getUserRole(request: NextRequest): PayngRole {
  const cookieRole = request.cookies.get(ROLE_COOKIE)?.value;
  if (isPayngRole(cookieRole)) {
    return cookieRole;
  }
  return "anonymous";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const rule = routeAccess.find((route) => matchesRoute(route.pattern, pathname));
  if (!rule) {
    return NextResponse.next();
  }

  const role = getUserRole(request);
  const isAuthenticated = role !== "anonymous";

  if (!isAuthenticated && !rule.allowAnonymous) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (rule.roles === "*") {
    return NextResponse.next();
  }

  if (rule.allowAnonymous && role === "anonymous") {
    return NextResponse.next();
  }

  if (!rule.roles.includes(role)) {
    const redirectUrl = new URL("/dashboard", request.url);
    redirectUrl.searchParams.set("denied", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};


