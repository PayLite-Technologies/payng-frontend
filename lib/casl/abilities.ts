import { AbilityBuilder, Ability, type AbilityClass } from "@casl/ability";
import type { User, Student } from "@/stores/userStore";
import type {
  PayngAction,
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
} from "./types";

// Type assertion for CASL Ability
const AppAbility = Ability as AbilityClass<AppAbility>;

/**
 * Define ability rules for a user based on their role and permissions
 * @param user - The user object
 * @param students - Optional array of linked students (for parents/guardians)
 * @returns CASL Ability instance
 */
export function defineAbilityFor(user: User | null, students: Student[] = []): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(AppAbility);

  // Anonymous users have no permissions
  if (!user || user.role === "anonymous") {
    return build();
  }

  const role = user.role;
  const permissions = user.permissions || [];
  const institutionId = user.institutionId;
  const studentIds = students.map((s) => s.id);
  const userId = user.id;

  // Super Admin: Full access to everything
  if (role === "super_admin") {
    can("manage", "all");
    return build();
  }

  // Parent/Guardian permissions
  if (role === "parent" || role === "guardian") {
    // Can read/manage own children's invoices
    if (studentIds.length > 0) {
      can("read", "Invoice", { studentId: { $in: studentIds } });
      can("download", "Invoice", { studentId: { $in: studentIds } });
    }

    // Can create payments for linked students
    if (studentIds.length > 0) {
      can("create", "Payment", { studentId: { $in: studentIds } });
      can("pay", "Invoice", { studentId: { $in: studentIds } });
    }

    // Can read/manage payment plans for linked students
    if (studentIds.length > 0) {
      can("read", "PaymentPlan", { studentId: { $in: studentIds } });
      can("create", "PaymentPlan", { studentId: { $in: studentIds } });
      can("update", "PaymentPlan", { studentId: { $in: studentIds } });
      can("cancel", "PaymentPlan", { studentId: { $in: studentIds } });
    }

    // Can read payment history for linked students
    if (studentIds.length > 0) {
      can("read", "Payment", { studentId: { $in: studentIds } });
      can("download", "Payment", { studentId: { $in: studentIds } });
    }

    // Can read own profile and linked students
    can("read", "User", { id: userId });
    can("update", "User", { id: userId });
    if (studentIds.length > 0) {
      can("read", "Student", { id: { $in: studentIds } });
    }

    // Can read fees for linked students
    if (studentIds.length > 0) {
      can("read", "FeeSchedule", { studentId: { $in: studentIds } });
      can("read", "FeeAssignment", { studentId: { $in: studentIds } });
    }
  }

  // Student permissions (read-only, own data only)
  if (role === "student") {
    // Read-only access to own invoices
    can("read", "Invoice", { studentId: userId });
    can("download", "Invoice", { studentId: userId });

    // Read-only access to own payment history
    can("read", "Payment", { studentId: userId });
    can("download", "Payment", { studentId: userId });

    // Read-only access to own fees
    can("read", "FeeSchedule", { studentId: userId });
    can("read", "FeeAssignment", { studentId: userId });

    // Can download own clearance certificate
    can("download", "Clearance", { studentId: userId });
    can("read", "Clearance", { studentId: userId });

    // Can read own profile
    can("read", "User", { id: userId });
    can("update", "User", { id: userId });
    can("read", "Student", { id: userId });
  }

  // Institution Admin permissions
  if (role === "institution_admin" && institutionId) {
    // Manage students within their institution
    can("manage", "Student", { institutionId });
    can("read", "Student", { institutionId });
    can("create", "Student", { institutionId });
    can("update", "Student", { institutionId });
    can("delete", "Student", { institutionId });

    // Manage fee structures within their institution
    can("manage", "FeeStructure", { institutionId });
    can("read", "FeeStructure", { institutionId });
    can("create", "FeeStructure", { institutionId });
    can("update", "FeeStructure", { institutionId });
    can("delete", "FeeStructure", { institutionId });

    // Manage fee schedules within their institution
    can("manage", "FeeSchedule", { institutionId });
    can("read", "FeeSchedule", { institutionId });
    can("create", "FeeSchedule", { institutionId });
    can("update", "FeeSchedule", { institutionId });
    can("delete", "FeeSchedule", { institutionId });

    // Manage fee assignments within their institution
    can("manage", "FeeAssignment", { institutionId });
    can("read", "FeeAssignment", { institutionId });
    can("create", "FeeAssignment", { institutionId });
    can("update", "FeeAssignment", { institutionId });
    can("delete", "FeeAssignment", { institutionId });

    // Read all invoices/payments for their institution
    can("read", "Invoice", { institutionId });
    can("download", "Invoice", { institutionId });
    can("read", "Payment", { institutionId });
    can("download", "Payment", { institutionId });
    can("read", "PaymentPlan", { institutionId });

    // Can reconcile payments for their institution
    can("reconcile", "Payment", { institutionId });
    can("read", "Reconciliation", { institutionId });
    can("create", "Reconciliation", { institutionId });

    // Can view reports for their institution
    can("read", "Report", { institutionId });
    can("export", "Report", { institutionId });

    // Can read own profile
    can("read", "User", { id: userId });
    can("update", "User", { id: userId });

    // Permission-based rules for institution admins
    if (permissions.includes("approve_fees")) {
      can("approve", "FeeSchedule", { institutionId });
    }
  }

  // Support permissions
  if (role === "support") {
    // Read all invoices, payments, users
    can("read", "Invoice");
    can("read", "Payment");
    can("read", "PaymentPlan");
    can("read", "User");
    can("read", "Student");

    // Manage support tickets
    can("manage", "SupportTicket");
    can("read", "SupportTicket");
    can("create", "SupportTicket");
    can("update", "SupportTicket");
    can("delete", "SupportTicket");

    // Can read reports (but not export unless permission)
    can("read", "Report");

    // Support override permission
    if (permissions.includes("support_override")) {
      // Can override certain restrictions (e.g., void invoices, refund payments)
      can("void", "Invoice");
      can("refund", "Payment");
      can("update", "User");
      can("update", "Student");
    }

    // Can read own profile
    can("read", "User", { id: userId });
    can("update", "User", { id: userId });
  }

  // Finance permissions
  if (role === "finance") {
    // Read all transactions and payments
    can("read", "Payment");
    can("read", "Invoice");
    can("read", "PaymentPlan");
    can("download", "Payment");
    can("download", "Invoice");

    // Can reconcile payments globally
    can("reconcile", "Payment");
    can("read", "Reconciliation");
    can("create", "Reconciliation");
    can("update", "Reconciliation");

    // Can view financial reports
    can("read", "Report");
    can("export", "Report");
    can("export", "Payment");
    can("export", "Invoice");

    // Can read users and institutions (for reporting)
    can("read", "User");
    can("read", "Institution");

    // Can read own profile
    can("read", "User", { id: userId });
    can("update", "User", { id: userId });
  }

  // Merchant permissions
  if (role === "merchant") {
    // Can manage merchant onboarding
    can("manage", "Merchant");
    can("read", "Merchant");
    can("create", "Merchant");
    can("update", "Merchant");

    // Can view reconciliation data
    can("read", "Reconciliation");
    can("read", "Payment");

    // Can view transactions related to their merchant account
    // (This would be scoped by merchantId in real implementation)
    can("read", "Payment");

    // Can read own profile
    can("read", "User", { id: userId });
    can("update", "User", { id: userId });
  }

  // Permission-based rules (apply to all roles that have them)
  if (permissions.includes("manage_students")) {
    // Can manage students (scoped by institution if institution admin)
    if (institutionId) {
      can("manage", "Student", { institutionId });
    } else {
      can("manage", "Student");
    }
  }

  if (permissions.includes("approve_fees")) {
    // Can approve fee schedules
    if (institutionId) {
      can("approve", "FeeSchedule", { institutionId });
    } else {
      can("approve", "FeeSchedule");
    }
  }

  if (permissions.includes("view_finance")) {
    // Can view financial reports
    if (institutionId) {
      can("read", "Report", { institutionId });
    } else {
      can("read", "Report");
    }
  }

  if (permissions.includes("manage_admins")) {
    // Can manage admin users
    can("manage", "User", { role: { $in: ["institution_admin", "support", "finance", "merchant"] } });
    can("read", "User", { role: { $in: ["institution_admin", "support", "finance", "merchant"] } });
    can("create", "User", { role: { $in: ["institution_admin", "support", "finance", "merchant"] } });
    can("update", "User", { role: { $in: ["institution_admin", "support", "finance", "merchant"] } });
    can("delete", "User", { role: { $in: ["institution_admin", "support", "finance", "merchant"] } });
  }

  return build();
}

/**
 * Create an empty ability (no permissions)
 * Useful for anonymous users or testing
 */
export function createEmptyAbility(): AppAbility {
  return new AppAbility();
}

