import type { User, Student } from "@/stores/userStore";
import { defineAbilityFor } from "./abilities";
import type {
  InvoiceSubject,
  PaymentSubject,
  PaymentPlanSubject,
  StudentSubject,
  ReportSubject,
  ReconciliationSubject,
  InstitutionSubject,
} from "./types";

/**
 * Check if user can read a specific invoice
 */
export function canReadInvoice(
  invoice: InvoiceSubject,
  user: User | null,
  students: Student[] = []
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user, students);
  return ability.can("read", invoice as any);
}

/**
 * Check if user can pay a specific invoice
 */
export function canPayInvoice(
  invoice: InvoiceSubject,
  user: User | null,
  students: Student[] = []
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user, students);
  return ability.can("pay", invoice as any);
}

/**
 * Check if user can download an invoice
 */
export function canDownloadInvoice(
  invoice: InvoiceSubject,
  user: User | null,
  students: Student[] = []
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user, students);
  return ability.can("download", invoice as any);
}

/**
 * Check if user can manage a specific student
 */
export function canManageStudent(
  student: StudentSubject,
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("manage", student as any) || ability.can("update", student as any);
}

/**
 * Check if user can view a specific report
 */
export function canViewReport(
  report: ReportSubject,
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("read", report as any);
}

/**
 * Check if user can export a report
 */
export function canExportReport(
  report: ReportSubject,
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("export", report as any);
}

/**
 * Check if user can reconcile a specific payment
 */
export function canReconcilePayment(
  payment: PaymentSubject,
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("reconcile", payment as any);
}

/**
 * Check if user can manage a specific institution
 */
export function canManageInstitution(
  institution: InstitutionSubject,
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("manage", institution as any);
}

/**
 * Check if user can export data (payments, invoices, reports)
 */
export function canExportData(user: User | null): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return (
    ability.can("export", "Payment") ||
    ability.can("export", "Invoice") ||
    ability.can("export", "Report")
  );
}

/**
 * Check if user can create a payment
 */
export function canCreatePayment(
  payment: PaymentSubject,
  user: User | null,
  students: Student[] = []
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user, students);
  return ability.can("create", payment as any);
}

/**
 * Check if user can manage a payment plan
 */
export function canManagePaymentPlan(
  plan: PaymentPlanSubject,
  user: User | null,
  students: Student[] = []
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user, students);
  return ability.can("manage", plan as any) || ability.can("update", plan as any);
}

/**
 * Filter invoices by user's read permissions
 */
export function filterAccessibleInvoices<T extends InvoiceSubject>(
  invoices: T[],
  user: User | null,
  students: Student[] = []
): T[] {
  if (!user) return [];
  const ability = defineAbilityFor(user, students);
  return invoices.filter((invoice) => ability.can("read", invoice as any));
}

/**
 * Filter payments by user's read permissions
 */
export function filterAccessiblePayments<T extends PaymentSubject>(
  payments: T[],
  user: User | null,
  students: Student[] = []
): T[] {
  if (!user) return [];
  const ability = defineAbilityFor(user, students);
  return payments.filter((payment) => ability.can("read", payment as any));
}

/**
 * Filter students by user's read permissions
 */
export function filterAccessibleStudents<T extends StudentSubject>(
  students: T[],
  user: User | null
): T[] {
  if (!user) return [];
  const ability = defineAbilityFor(user);
  return students.filter((student) => ability.can("read", student as any));
}

/**
 * Check if user can approve a fee schedule
 */
export function canApproveFeeSchedule(
  feeSchedule: { institutionId?: string },
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("approve", feeSchedule as any);
}

/**
 * Check if user can void an invoice
 */
export function canVoidInvoice(
  invoice: InvoiceSubject,
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("void", invoice as any);
}

/**
 * Check if user can refund a payment
 */
export function canRefundPayment(
  payment: PaymentSubject,
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("refund", payment as any);
}

/**
 * Check if user can download a payment receipt
 */
export function canDownloadPayment(
  payment: PaymentSubject,
  user: User | null,
  students: Student[] = []
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user, students);
  return ability.can("download", payment as any);
}

/**
 * Check if user can download a clearance certificate
 */
export function canDownloadClearance(
  clearance: { studentId?: string },
  user: User | null
): boolean {
  if (!user) return false;
  const ability = defineAbilityFor(user);
  return ability.can("download", clearance as any);
}

