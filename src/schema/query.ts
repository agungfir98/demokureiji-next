import { z } from "zod";

export const searchQuerySchema = z.object({
  search: z.string().optional(),
});

export const paginationQuerySchema = z.object({
  limit: z.number().default(5),
  page: z.number().default(1),
});

export const searchAndPaginationSchema = paginationQuerySchema
  .merge(searchQuerySchema)
  .refine((val) => val.limit > 0 && val.page > 0, {
    message: "limist and page must be greated than 0",
  });

export type SeachQueryType = z.infer<typeof searchQuerySchema>;
export type PaginationQueryType = z.infer<typeof paginationQuerySchema>;
export type SearchAndPaginateType = z.infer<typeof searchAndPaginationSchema>;
