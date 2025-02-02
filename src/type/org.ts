import { z } from "zod";

export const newOrgSchema = z.object({
  orgName: z.string().min(3),
  description: z.string().optional(),
});

export type NewOrgType = z.infer<typeof newOrgSchema>;

export const orgQuerySchema = z.object({
  memberLimit: z
    .string()
    .default("5")
    .transform((v) => Number(v)),
  memberPage: z
    .string()
    .default("1")
    .transform((v) => Number(v)),
  searchMember: z.string().optional(),
});

export type OrgQueryType = z.infer<typeof orgQuerySchema>;
