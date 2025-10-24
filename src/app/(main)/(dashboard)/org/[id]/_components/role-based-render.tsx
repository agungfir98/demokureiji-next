"use client";
import { PropsWithChildren } from "react";

const ROLE_HIERARCHY = {
  ADMIN: ["MASTER", "ADMIN"],
  MEMBER: ["MEMBER", "ADMIN"],
} as const;

type Role = keyof typeof ROLE_HIERARCHY;

export const RoleBaseRenderer: React.FC<
  PropsWithChildren<{
    userRole: string;
    requiredRole: Role;
  }>
> = ({ userRole = "member", children, requiredRole }) => {
  const hasAccess = (): boolean => {
    if (!requiredRole) return true;
    return ROLE_HIERARCHY[requiredRole]?.includes(
      userRole.toUpperCase() as never
    );
  };

  return <>{hasAccess() ? children : null}</>;
};
