export * from "./addMember";
export * from "./createOrg";
export * from "./demoteAdmin";
export * from "./getOrgEvents";
export * from "./getOrgMembers";
export * from "./getSingleOrg";
export * from "./getUserOrg";
export * from "./promoteMember";
export * from "./removeMember";

export const getOrgQueryKey = () => ["organization"];
export const getOrgMemberQueryKey = () => ["org-member"];
export const getOrgEventQueryKey = () => ["org-event"];
