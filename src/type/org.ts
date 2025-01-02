import { z } from "zod";

export const newOrgSchema = z.object({
  orgName: z.string().min(3),
  description: z.string().optional(),
});

export type NewOrgType = z.infer<typeof newOrgSchema>;
