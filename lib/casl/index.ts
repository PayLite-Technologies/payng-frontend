/**
 * CASL Helper Abstraction for Payng
 * 
 * This module provides a complete permission system using CASL (Isomorphic Authorization Library)
 * with helper abstractions for all Payng access control rules.
 * 
 * @module lib/casl
 */

// Types
export type {
  PayngAction,
  PayngSubject,
  PayngSubjectType,
  AppAbility,
  InvoiceSubject,
  PaymentSubject,
  PaymentPlanSubject,
  StudentSubject,
  FeeScheduleSubject,
  FeeStructureSubject,
  FeeAssignmentSubject,
  InstitutionSubject,
  UserSubject,
  ReportSubject,
  ReconciliationSubject,
  SupportTicketSubject,
  MerchantSubject,
  ClearanceSubject,
  PermissionConditions,
} from "./types";

// Ability factory
export { defineAbilityFor, createEmptyAbility } from "./abilities";

// React hooks
export {
  useAbility,
  useCan,
  useCannot,
  useAbilityFor,
  usePermissions,
} from "./hooks";

// Helper functions
export {
  canReadInvoice,
  canPayInvoice,
  canDownloadInvoice,
  canManageStudent,
  canViewReport,
  canExportReport,
  canReconcilePayment,
  canManageInstitution,
  canExportData,
  canCreatePayment,
  canManagePaymentPlan,
  filterAccessibleInvoices,
  filterAccessiblePayments,
  filterAccessibleStudents,
  canApproveFeeSchedule,
  canVoidInvoice,
  canRefundPayment,
  canDownloadPayment,
  canDownloadClearance,
} from "./helpers";

// React components
export {
  Can,
  Cannot,
  AbilityGate,
  ConditionalRender,
} from "./components";

// Re-export CASL types for convenience
export type { Ability, RawRuleOf, ForcedSubject } from "@casl/ability";

