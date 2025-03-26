import { z } from "zod";

export const newOrgSchema = z.object({
  orgName: z.string().min(3),
  description: z.string().optional(),
});

export type NewOrgType = z.infer<typeof newOrgSchema>;

export const searchQuerySchema = z.object({
  search: z.string().optional(),
});

export const paginationQuerySchema = z.object({
  limit: z
    .string()
    .default("5")
    .transform((v) => Number(v)),
  page: z
    .string()
    .default("1")
    .transform((v) => Number(v)),
});
export type PaginationQueryType = z.infer<typeof paginationQuerySchema>;

export const orgMemberQuerySchema =
  paginationQuerySchema.merge(searchQuerySchema);
export type OrgMemberQueryType = z.infer<typeof orgMemberQuerySchema>;
