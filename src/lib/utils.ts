import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OrgMemberRole } from "~/type/org.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasRole(
  role: OrgMemberRole,
  allowedRole: OrgMemberRole[],
): boolean {
  return allowedRole.includes(role);
}
