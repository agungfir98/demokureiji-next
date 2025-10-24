import { useMutation } from "@tanstack/react-query";
import { axiosInstance, HttpResponse } from "../api";
import { z } from "zod";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { getOrgQueryKey } from ".";

export const createOrgSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

export type createOrgRequest = z.infer<typeof createOrgSchema>;

export const createOrganization = async (data: createOrgRequest) => {
  const response = await axiosInstance.post<HttpResponse>("/org/new", data);
  return response.data;
};

type UseCreateOrgConfig = MutationConfig<typeof createOrganization>;
export const useCreateOrg = (mutationConfig: UseCreateOrgConfig = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: createOrganization,
    onSuccess: (data, variables, ctx) => {
      queryClient.invalidateQueries({
        queryKey: getOrgQueryKey(),
      });
      mutationConfig?.onSuccess?.(data, variables, ctx);
    },
  });
};
