import { z } from "zod";

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

export type SeachQueryType = z.infer<typeof searchQuerySchema>;
export type PaginationQueryType = z.infer<typeof paginationQuerySchema>;
