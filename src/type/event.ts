import { z } from "zod";
import { paginationQuerySchema, searchQuerySchema } from "./query";

const candidateSchema = z.object({
  calonKetua: z.string().min(1, "this field can not be empty"),
  calonWakil: z.string().optional(),
  description: z.string().min(1, "this field can not be empty"),
});

export const newEventSchema = z.object({
  voteTitle: z.string().min(3, "title must be at least three letter"),
  candidates: z
    .array(candidateSchema)
    .min(2, "there mus be at least two candidates"),
});
export type NewEventType = z.infer<typeof newEventSchema>;

export const votersQuerySchema = paginationQuerySchema.merge(searchQuerySchema);
export type VotersQueryType = z.infer<typeof votersQuerySchema>;
