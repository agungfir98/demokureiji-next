import { z } from "zod";
import { axiosInstance, HttpResponse } from "../api";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { useMutation } from "@tanstack/react-query";

export const voteSchema = z
  .object({
    voteToken: z.string().nonempty("No vote token provided!"),
    organizationId: z.string(),
    candidateId: z.string().uuid(),
    isAbstain: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const hasCandidateId = !!data.candidateId;
    const isAbstain = data.isAbstain;

    if (hasCandidateId === isAbstain) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "can\'t have both candidateId and isAbstain sent together",
        path: ["candidateId", "isAbstain"],
      });
    }
  });

export type Vote = z.infer<typeof voteSchema>;

type VoteRequest = {
  eventId: string;
  payload: Vote;
};

export const vote = async (params: VoteRequest) => {
  const response = await axiosInstance.post<
    HttpResponse<{ voteReceipt: string }>
  >(`/events/${params.eventId}/votes`, params.payload);
  return response.data;
};

type UseVoteOpts = {
  eventId: string;
  mutationConfig?: MutationConfig<typeof vote>;
};

export const useVote = (params: UseVoteOpts) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: vote,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [params.eventId] });
      params.mutationConfig?.onSuccess?.(data, variables, context);
    },
  });
};
