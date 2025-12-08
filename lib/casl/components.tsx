"use client";

import { ReactNode } from "react";
import { useAbility, useCan, useCannot } from "./hooks";
import type { PayngAction, PayngSubjectType } from "./types";

interface CanProps {
  action: PayngAction;
  subject: PayngSubjectType | "all" | string;
  conditions?: Record<string, any>;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that renders children only if the user can perform the action
 * 
 * @example
 * <Can action="read" subject="Invoice" conditions={{ studentId: student.id }}>
 *   <InvoiceDetail />
 * </Can>
 */
export function Can({ action, subject, conditions, children, fallback = null }: CanProps) {
  const can = useCan(action, subject, conditions);
  return <>{can ? children : fallback}</>;
}

interface CannotProps {
  action: PayngAction;
  subject: PayngSubjectType | "all" | string;
  conditions?: Record<string, any>;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component that renders children only if the user cannot perform the action
 * Inverse of Can component
 * 
 * @example
 * <Cannot action="update" subject="Student">
 *   <ReadOnlyStudentView />
 * </Cannot>
 */
export function Cannot({ action, subject, conditions, children, fallback = null }: CannotProps) {
  const cannot = useCannot(action, subject, conditions);
  return <>{cannot ? children : fallback}</>;
}

interface AbilityGateProps {
  action: PayngAction;
  subject: PayngSubjectType | "all" | string;
  conditions?: Record<string, any>;
  children: ReactNode;
  loadingFallback?: ReactNode;
  unauthorizedFallback?: ReactNode;
  authorizedFallback?: ReactNode;
}

/**
 * More flexible gate component with custom fallbacks
 * 
 * @example
 * <AbilityGate
 *   action="manage"
 *   subject="Student"
 *   loadingFallback={<Spinner />}
 *   unauthorizedFallback={<AccessDenied />}
 * >
 *   <StudentManagement />
 * </AbilityGate>
 */
export function AbilityGate({
  action,
  subject,
  conditions,
  children,
  loadingFallback = null,
  unauthorizedFallback = null,
  authorizedFallback = null,
}: AbilityGateProps) {
  const ability = useAbility();
  const can = useCan(action, subject, conditions);

  // In a real implementation, you might want to check loading state
  // For now, we'll just check permissions
  if (can) {
    return <>{children}</>;
  }

  return <>{unauthorizedFallback}</>;
}

interface ConditionalRenderProps {
  check: (ability: ReturnType<typeof useAbility>) => boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Component for custom permission checks using a function
 * 
 * @example
 * <ConditionalRender
 *   check={(ability) => ability.can('read', 'Invoice') && ability.can('pay', 'Invoice')}
 * >
 *   <PayButton />
 * </ConditionalRender>
 */
export function ConditionalRender({ check, children, fallback = null }: ConditionalRenderProps) {
  const ability = useAbility();
  const result = check(ability);
  return <>{result ? children : fallback}</>;
}

