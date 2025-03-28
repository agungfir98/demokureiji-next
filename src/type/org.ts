import { z } from "zod";
import { paginationQuerySchema, searchQuerySchema } from "./query";

export const newOrgSchema = z.object({
  orgName: z.string().min(3),
  description: z.string().optional(),
});
export type NewOrgType = z.infer<typeof newOrgSchema>;

export const orgMemberQuerySchema =
  paginationQuerySchema.merge(searchQuerySchema);
export type OrgMemberQueryType = z.infer<typeof orgMemberQuerySchema>;
