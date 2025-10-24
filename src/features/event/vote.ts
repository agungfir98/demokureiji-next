import { z } from "zod";
import { axiosInstance } from "../api";
import { MutationConfig } from "~/lib/query-client";
import { useMutation } from "@tanstack/react-query";

export const voteSchema = z
  .object({
    voteToken: z.string().nonempty("No vote token provided!"),
    userId: z.string().uuid(),
    eventId: z.string().uuid(),
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
type VoteRequest = {
  eventId: string;
  payload: z.infer<typeof voteSchema>;
};

export const vote = async (params: VoteRequest) => {
  const response = await axiosInstance.post(
    `/events/${params.eventId}`,
    params.payload,
  );
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
  });
};
