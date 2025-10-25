import { z } from "zod";
import { axiosInstance } from "../api";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { useMutation } from "@tanstack/react-query";

export const patchEventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "finished"]).optional(),
  allowAbstain: z.boolean().optional(),
  requiresRegistration: z.boolean().optional(),
});

type PatchEvent = z.infer<typeof patchEventSchema>;

type PatchEventRequest = {
  eventId: string;
  payload: PatchEvent;
};
export const patchEvent = async (params: PatchEventRequest) => {
  const response = await axiosInstance.patch(
    `/events/${params.eventId}`,
    params.payload,
  );
  return response.data;
};

type UsePatchEventConfig = MutationConfig<typeof patchEvent>;

export const usePatchEvent = (mutationConfig: UsePatchEventConfig = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: patchEvent,
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: [variables.eventId],
      });
    },
  });
};
