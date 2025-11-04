import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { MutationConfig } from "~/lib/query-client";
import { axiosInstance } from "../api";

export const createEventSchema = z.object({
  id: z.string().uuid().optional(),
  organizationId: z
    .string()
    .uuid()
    .nonempty("organizationId should not be empty"),
  title: z.string().nonempty("event title should not be empty"),
  allowAbstain: z.boolean(),
  description: z.string(),
});

export const candidateSchema = z.object({
  number: z.number(),
  organizationId: z.string().uuid(),
  eventId: z.string().uuid().optional(),
  leaderId: z.string().uuid(),
  viceLeaderId: z.string().uuid().optional(),
  visionMission: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});
export const candidatesSchema = z.array(candidateSchema);

export const createEventandCandidateSchema = createEventSchema.merge(
  z.object({ candidates: candidatesSchema }),
);

export type CreateEventType = z.infer<typeof createEventandCandidateSchema>;

export const createEvent = async (payload: CreateEventType) => {
  const response = await axiosInstance.post(`/events`, payload, {
    headers: { "X-Idempotency-Key": payload.id, },
  });
  return response.data;
};

type UseCreateEventConfig = MutationConfig<typeof createEvent>;

export const useCreateEvent = (mutationConfig: UseCreateEventConfig) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: createEvent,
  });
};
