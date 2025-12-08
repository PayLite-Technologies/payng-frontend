import type { User, Student } from "@/stores/userStore";

/**
 * All possible actions that can be performed on subjects
 */
export type PayngAction =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "pay"
  | "download"
  | "approve"
  | "cancel"
  | "reconcile"
  | "void"
  | "refund"
  | "export"
  | "manage";

/**
 * All possible subjects (resources) in the system
 */
export type PayngSubject =
  | "Invoice"
  | "Payment"
  | "PaymentPlan"
  | "Student"
  | "FeeSchedule"
  | "FeeStructure"
  | "FeeAssignment"
  | "Institution"
  | "User"
  | "Report"
  | "Reconciliation"
  | "SupportTicket"
  | "Merchant"
  | "Clearance"
  | "all";

/**
 * Subject type definitions with optional scoping fields
 * These match the structure of actual data objects
 */
export interface InvoiceSubject {
  id?: string;
  studentId?: string;
  institutionId?: string;
  parentId?: string;
  status?: string;
}

export interface PaymentSubject {
  id?: string;
  studentId?: string;
  institutionId?: string;
  parentId?: string;
  invoiceId?: string;
  status?: string;
}

export interface PaymentPlanSubject {
  id?: string;
  studentId?: string;
  institutionId?: string;
  parentId?: string;
  status?: string;
}

export interface StudentSubject {
  id?: string;
  studentId?: string;
  institutionId?: string;
  parentId?: string;
}

export interface FeeScheduleSubject {
  id?: string;
  institutionId?: string;
  class?: string;
  term?: string;
}

export interface FeeStructureSubject {
  id?: string;
  institutionId?: string;
  category?: string;
}

export interface FeeAssignmentSubject {
  id?: string;
  studentId?: string;
  institutionId?: string;
  feeScheduleId?: string;
}

export interface InstitutionSubject {
  id?: string;
  institutionId?: string;
}

export interface UserSubject {
  id?: string;
  role?: string;
  institutionId?: string;
}

export interface ReportSubject {
  id?: string;
  institutionId?: string;
  type?: string;
}

export interface ReconciliationSubject {
  id?: string;
  institutionId?: string;
  paymentId?: string;
}

export interface SupportTicketSubject {
  id?: string;
  userId?: string;
  status?: string;
}

export interface MerchantSubject {
  id?: string;
  merchantId?: string;
}

export interface ClearanceSubject {
  id?: string;
  studentId?: string;
  institutionId?: string;
}

/**
 * Union type of all subject types
 */
export type PayngSubjectType =
  | InvoiceSubject
  | PaymentSubject
  | PaymentPlanSubject
  | StudentSubject
  | FeeScheduleSubject
  | FeeStructureSubject
  | FeeAssignmentSubject
  | InstitutionSubject
  | UserSubject
  | ReportSubject
  | ReconciliationSubject
  | SupportTicketSubject
  | MerchantSubject
  | ClearanceSubject;

/**
 * Type helper for CASL ability
 */
export type AppAbility = import("@casl/ability").Ability<[PayngAction, PayngSubjectType | "all"]>;

/**
 * Conditions for permission checks
 * Supports MongoDB-style query operators for scoping
 */
export interface PermissionConditions {
  studentId?: string | { $in?: string[] };
  institutionId?: string;
  parentId?: string;
  userId?: string;
  [key: string]: any;
}

