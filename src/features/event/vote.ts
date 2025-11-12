import { z } from "zod";
import { axiosInstance, HttpResponse } from "../api";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { setIdempotenHeader } from "~/lib/utils";

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
  >(`/events/${params.eventId}/votes`, params.payload, {
    headers: {
      ...setIdempotenHeader(params.payload.voteToken)
    }
  });
  return response.data;
};

type UseVoteOpts = {
  eventId: string;
  mutationConfig?: MutationConfig<typeof vote>;
};

export const useVote = (params: UseVoteOpts) => {
  const { onSuccess, ...restConfig } = params.mutationConfig || {}
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [params.eventId] });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: vote,
  });
};
