"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { InputHTMLAttributes } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FaLink, FaUserCheck, FaUserFriends, FaUserShield } from "react-icons/fa";
import clsx from "clsx";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useUserStore, type Student } from "@/stores/userStore";
import RoleGate from "@/components/auth/RoleGate";
import { Badge } from "@/components/ui/badge";

const baseProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(7, "Phone number is required"),
  profileImageUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.startsWith("http"),
      "Provide a valid image URL"
    ),
  isPublicProfile: z.boolean().default(true),
});

const adminFormSchema = z.object({
  adminLevel: z.enum(["institution", "platform", "support", "finance", "merchant"], {
    required_error: "Select an admin level",
  }),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
});

const linkStudentSchema = z.object({
  studentId: z.string().min(3, "Provide a valid student ID"),
  relationship: z.enum(["parent", "guardian"]),
});

type BaseProfileFormValues = z.infer<typeof baseProfileSchema>;
type AdminFormValues = z.infer<typeof adminFormSchema>;
type LinkStudentFormValues = z.infer<typeof linkStudentSchema>;

const adminPermissions = [
  { key: "manage_students", label: "Manage Students" },
  { key: "approve_fees", label: "Approve Fee Schedules" },
  { key: "view_finance", label: "View Financial Reports" },
  { key: "manage_admins", label: "Manage Admin Users" },
  { key: "support_override", label: "Support Overrides" },
];

const roleMeta: Record<
  string,
  {
    label: string;
    background: string;
    color: string;
  }
> = {
  parent: { label: "Parent", background: "#F0F8FF", color: "#000080" },
  guardian: { label: "Guardian", background: "#FFF7E6", color: "#B45309" },
  student: { label: "Student", background: "#ECFDF5", color: "#047857" },
  institution_admin: { label: "Institution Admin", background: "#EEF2FF", color: "#3730A3" },
  super_admin: { label: "Super Admin", background: "#FEF3C7", color: "#92400E" },
  support: { label: "Support", background: "#FDF2F8", color: "#9D174D" },
  finance: { label: "Finance", background: "#F0FDFA", color: "#065F46" },
  merchant: { label: "Merchant", background: "#FFF1F2", color: "#B91C1C" },
  anonymous: { label: "Anonymous", background: "#E5E7EB", color: "#374151" },
};

export default function ProfilePage() {
  const {
    user,
    students,
    isParent,
    isGuardian,
    isStudent,
    isInstitutionAdmin,
    isSuperAdmin,
    isFinance,
    isSupport,
    isMerchant,
    updateUser,
  } = useUserStore();

  const role = user?.role ?? "anonymous";
  const isAuthenticated = Boolean(user);
  const isAdminRole =
    isInstitutionAdmin() || isSuperAdmin() || isFinance() || isSupport() || isMerchant();

  const baseForm = useForm<BaseProfileFormValues>({
    resolver: zodResolver(baseProfileSchema),
    defaultValues: {
      firstName: user?.name?.split(" ")?.[0] || "",
      lastName: user?.name?.split(" ")?.slice(1).join(" ") || "",
      phoneNumber: user?.phoneNumber || "",
      profileImageUrl: user?.profileImageUrl || "",
      isPublicProfile: user?.publicProfile ?? true,
    },
  });

  const adminForm = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      adminLevel: (user?.adminLevel as AdminFormValues["adminLevel"]) || "institution",
      permissions: user?.permissions || ["manage_students"],
    },
  });

  const linkForm = useForm<LinkStudentFormValues>({
    resolver: zodResolver(linkStudentSchema),
    defaultValues: {
      studentId: "",
      relationship: isParent() ? "parent" : "guardian",
    },
  });

  useEffect(() => {
    if (!user) return;
    const [firstName, ...rest] = user.name?.split(" ") ?? ["", ""];
    baseForm.reset({
      firstName: firstName || "",
      lastName: rest.join(" "),
      phoneNumber: user.phoneNumber || "",
      profileImageUrl: user.profileImageUrl || "",
      isPublicProfile: user.publicProfile ?? true,
    });
  }, [baseForm, user]);

  useEffect(() => {
    if (!user) return;
    adminForm.reset({
      adminLevel: (user.adminLevel as AdminFormValues["adminLevel"]) || "institution",
      permissions: user.permissions || ["manage_students"],
    });
  }, [adminForm, user]);

  useEffect(() => {
    linkForm.reset({
      studentId: "",
      relationship: isParent() ? "parent" : "guardian",
    });
  }, [isParent, linkForm]);

  const handleProfileSubmit = (values: BaseProfileFormValues) => {
    if (!user) {
      toast.error("Please sign in to update your profile.");
      return;
    }

    updateUser({
      name: `${values.firstName} ${values.lastName}`.trim(),
      phoneNumber: values.phoneNumber,
      profileImageUrl: values.profileImageUrl || user.profileImageUrl,
      publicProfile: values.isPublicProfile,
    });

    toast.success("Profile saved", {
      description: values.isPublicProfile
        ? "Public profile is visible to guardians and students."
        : "Only you and platform admins can see this profile.",
    });
  };

  const handleAdminSubmit = (values: AdminFormValues) => {
    if (!user) return;

    updateUser({
      adminLevel: values.adminLevel,
      permissions: values.permissions,
    });

    toast.success("Admin permissions updated", {
      description: `${values.permissions.length} permission(s) applied.`,
    });
  };

  const handleLinkStudent = (values: LinkStudentFormValues) => {
    toast.success("Student link requested", {
      description: `Student ID ${values.studentId} will be verified.`,
    });
    linkForm.reset({
      studentId: "",
      relationship: values.relationship,
    });
  };

  const activeRoleStyles = roleMeta[role] || roleMeta.anonymous;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
              >
                Profile
              </h1>
              <p className="text-sm text-gray-500">
                Shared profile with role-based controls and linked entities.
              </p>
            </div>
            <Badge
              className="text-xs px-4 py-2 rounded-full"
              style={{
                backgroundColor: activeRoleStyles.background,
                color: activeRoleStyles.color,
                border: "none",
              }}
            >
              {activeRoleStyles.label}
            </Badge>
          </div>
        </motion.div>

        {!isAuthenticated ? (
          <AnonymousProfileView />
        ) : (
          <>
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6"
              style={{ boxShadow: "0 12px 30px rgba(15,23,42,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <FaUserCheck className="text-[#000080]" />
                <div>
                  <h2 className="text-xl font-semibold text-[#000080]">Identity & Preferences</h2>
                  <p className="text-sm text-gray-500">
                    Base information shared across all Payng experiences.
                  </p>
                </div>
              </div>

              <form onSubmit={baseForm.handleSubmit(handleProfileSubmit)} className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="First Name"
                    error={baseForm.formState.errors.firstName?.message}
                    inputProps={{
                      ...baseForm.register("firstName"),
                      placeholder: "Jane",
                    }}
                  />
                  <Field
                    label="Last Name"
                    error={baseForm.formState.errors.lastName?.message}
                    inputProps={{
                      ...baseForm.register("lastName"),
                      placeholder: "Doe",
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Phone Number"
                    error={baseForm.formState.errors.phoneNumber?.message}
                    inputProps={{
                      ...baseForm.register("phoneNumber"),
                      placeholder: "+234 800 000 0000",
                    }}
                  />
                  <Field
                    label="Profile Image URL"
                    error={baseForm.formState.errors.profileImageUrl?.message}
                    inputProps={{
                      ...baseForm.register("profileImageUrl"),
                      placeholder: "https://cdn.payng.co/avatar.png",
                    }}
                  />
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded text-[#000080]"
                    {...baseForm.register("isPublicProfile")}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#0f172a]">Public profile</p>
                    <p className="text-xs text-gray-500">
                      Allow guardians or institution admins to view your summary card when needed.
                    </p>
                  </div>
                </label>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={clsx(
                      "px-6 py-3 rounded-full text-white font-medium transition-all duration-200",
                      baseForm.formState.isSubmitting ? "opacity-70" : "hover:opacity-90"
                    )}
                    style={{ backgroundColor: "#000080" }}
                    disabled={baseForm.formState.isSubmitting}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.section>

            <RoleGate
              allow={["parent", "guardian"]}
              suppressRedirect
              unauthorizedFallback={null}
            >
              <ParentGuardianSection
                students={students}
                linkForm={linkForm}
                onSubmit={handleLinkStudent}
              />
            </RoleGate>

            <RoleGate allow={["student"]} suppressRedirect unauthorizedFallback={null}>
              <StudentSummaryCard />
            </RoleGate>

            <RoleGate
              allow={["institution_admin", "super_admin", "support", "finance", "merchant"]}
              suppressRedirect
              unauthorizedFallback={null}
            >
              {isAdminRole && (
                <motion.section
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6"
                  style={{ boxShadow: "0 12px 30px rgba(15,23,42,0.08)" }}
                >
                  <div className="flex items-center gap-3">
                    <FaUserShield className="text-[#000080]" />
                    <div>
                      <h2 className="text-xl font-semibold text-[#000080]">Admin Controls</h2>
                      <p className="text-sm text-gray-500">
                        Configure admin level and scoped permissions.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={adminForm.handleSubmit(handleAdminSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Admin Level
                        </label>
                        <select
                          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                          {...adminForm.register("adminLevel")}
                        >
                          <option value="institution">Institution</option>
                          <option value="platform">Platform</option>
                          <option value="support">Support</option>
                          <option value="finance">Finance</option>
                          <option value="merchant">Merchant</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          Determines default data scope and dashboards.
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-3">Permissions</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {adminPermissions.map((permission) => (
                          <label
                            key={permission.key}
                            className="flex items-start gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-[#000080]/40 transition"
                          >
                            <input
                              type="checkbox"
                              value={permission.key}
                              className="mt-1 h-4 w-4 accent-[#000080]"
                              {...adminForm.register("permissions")}
                            />
                            <span className="text-sm text-gray-700">{permission.label}</span>
                          </label>
                        ))}
                      </div>
                      {adminForm.formState.errors.permissions?.message && (
                        <p className="text-xs text-red-500 mt-2">
                          {adminForm.formState.errors.permissions.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className={clsx(
                          "px-6 py-3 rounded-full text-white font-medium transition-all duration-200",
                          adminForm.formState.isSubmitting ? "opacity-70" : "hover:opacity-90"
                        )}
                        style={{ backgroundColor: "#000080" }}
                        disabled={adminForm.formState.isSubmitting}
                      >
                        Save Admin Settings
                      </button>
                    </div>
                  </form>
                </motion.section>
              )}
            </RoleGate>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function Field({
  label,
  error,
  inputProps,
}: {
  label: string;
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        {...inputProps}
        className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ParentGuardianSection({
  students,
  linkForm,
  onSubmit,
}: {
  students: Student[];
  linkForm: UseFormReturn<LinkStudentFormValues>;
  onSubmit: (values: LinkStudentFormValues) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6"
      style={{ boxShadow: "0 12px 30px rgba(15,23,42,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <FaUserFriends className="text-[#000080]" />
        <div>
          <h2 className="text-xl font-semibold text-[#000080]">Linked Students</h2>
          <p className="text-sm text-gray-500">
            Parents/guardians manage dependents from this shared screen.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {students.length === 0 ? (
          <p className="text-sm text-gray-500">No linked students yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="border border-gray-200 rounded-xl p-4 space-y-1 bg-gray-50"
              >
                <p className="font-semibold text-[#000080]">{student.name}</p>
                <p className="text-sm text-gray-600">Grade: {student.grade}</p>
                <p className="text-xs text-gray-500">Student ID: {student.studentId}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={linkForm.handleSubmit(onSubmit)}
        className="border border-dashed border-gray-300 rounded-2xl p-4 space-y-4"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <FaLink className="text-[#000080]" />
          Link a new student
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Student ID"
            error={linkForm.formState.errors.studentId?.message}
            inputProps={{
              ...linkForm.register("studentId"),
              placeholder: "STU-2024-001",
            }}
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">
              Relationship
            </label>
            <select
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              {...linkForm.register("relationship")}
            >
              <option value="parent">Parent</option>
              <option value="guardian">Guardian</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: "#000080" }}
            disabled={linkForm.formState.isSubmitting}
          >
            Request Link
          </button>
        </div>
      </form>
    </motion.section>
  );
}

function StudentSummaryCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4"
      style={{ boxShadow: "0 12px 30px rgba(15,23,42,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <FaUserCheck className="text-[#000080]" />
        <div>
          <h2 className="text-xl font-semibold text-[#000080]">Student Safety</h2>
          <p className="text-sm text-gray-500">
            Students can download clearance letters and view assigned guardians.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100">
          Status: Active
        </Badge>
        <Badge className="bg-blue-50 text-blue-700 border-blue-100">All fees synced</Badge>
      </div>
    </motion.section>
  );
}

function AnonymousProfileView() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 text-center"
      style={{ boxShadow: "0 12px 30px rgba(15,23,42,0.08)" }}
    >
      <FaUserCheck className="text-4xl text-[#000080] mx-auto" />
      <h2 className="text-xl font-semibold text-[#000080]">Public Profile Preview</h2>
      <p className="text-sm text-gray-500">
        This profile is in view-only mode. Sign in to manage details or link students.
      </p>
      <Link
        href="/login"
        className="inline-flex items-center justify-center px-6 py-2 rounded-full text-white font-medium"
        style={{ backgroundColor: "#000080" }}
      >
        Sign in to continue
      </Link>
    </motion.section>
  );
}

