import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../api";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { getOrgMemberQueryKey } from ".";

export const addMember = async ({
  orgId,
  userId,
}: {
  userId: string;
  orgId: string;
}) => {
  const response = await axiosInstance.post(`/org/${orgId}/members/add`, {
    userId,
  });
  return response.data;
};

type UseAddMemberConfig = MutationConfig<typeof addMember>;

export const useAddMember = (mutationConfig?: UseAddMemberConfig) => {
  const { onSuccess, ...restConfig } = mutationConfig || {}
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getOrgMemberQueryKey() });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addMember,
  });
};
