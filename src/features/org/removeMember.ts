import { useMutation } from "@tanstack/react-query";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { axiosInstance } from "../api";
import { getOrgMemberQueryKey } from ".";

export const removeMember = async ({
  orgId,
  userId,
}: {
  userId: string;
  orgId: string;
}) => {
  const response = await axiosInstance.delete(
    `/org/${orgId}/members/${userId}`,
  );
  return response.data;
};

type UseRemoveMemberConfig = MutationConfig<typeof removeMember>;

export const useRemoveMember = (mutationConfig?: UseRemoveMemberConfig) => {
  const { onSuccess, ...restConfig } = mutationConfig || {}
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getOrgMemberQueryKey() });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: removeMember,
  });
};
