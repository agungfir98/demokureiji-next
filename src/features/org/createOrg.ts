import { useMutation } from "@tanstack/react-query";
import { axiosInstance, HttpResponse } from "../api";
import { z } from "zod";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { getOrgQueryKey } from ".";
import { setIdempotenHeader } from "~/lib/utils";

export const createOrgSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  description: z.string().optional(),
});

export type createOrgRequest = z.infer<typeof createOrgSchema>;

export const createOrganization = async (payload: createOrgRequest) => {
  const response = await axiosInstance.post<HttpResponse>("/org", payload, {
    headers: {
      ...setIdempotenHeader(payload.id)
    }
  });
  return response.data;
};
type UseCreateOrgConfig = MutationConfig<typeof createOrganization>;

export const useCreateOrg = (mutationConfig: UseCreateOrgConfig = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {}
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getOrgQueryKey(),
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createOrganization,
  });
};
