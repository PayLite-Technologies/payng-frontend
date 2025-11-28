export type PayngRole =
  | "parent"
  | "guardian"
  | "student"
  | "institution_admin"
  | "super_admin"
  | "support"
  | "finance"
  | "merchant"
  | "anonymous";

export const AUTHENTICATED_ROLES: PayngRole[] = [
  "parent",
  "guardian",
  "student",
  "institution_admin",
  "super_admin",
  "support",
  "finance",
  "merchant",
];

export const ADMIN_ROLES: PayngRole[] = [
  "institution_admin",
  "super_admin",
  "support",
  "finance",
  "merchant",
];

export const ROLE_GROUPS = {
  global: AUTHENTICATED_ROLES,
  payerFacing: ["parent", "guardian", "student"] as PayngRole[],
  adminFacing: ADMIN_ROLES,
  financeFacing: ["finance", "merchant", "super_admin"] as PayngRole[],
  anonymous: ["anonymous"] as PayngRole[],
};

const ROLE_SET = new Set<PayngRole>([...AUTHENTICATED_ROLES, "anonymous"]);

export function isPayngRole(value?: string | null): value is PayngRole {
  return value ? ROLE_SET.has(value as PayngRole) : false;
}

