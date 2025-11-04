import { MutationConfig, queryClient } from "~/lib/query-client";
import { axiosInstance } from "../api";
import { useMutation } from "@tanstack/react-query";
import { getOrgMemberQueryKey } from ".";

export const demoteAdmin = async ({
  orgId,
  userId,
}: {
  userId: string;
  orgId: string;
}) => {
  const response = await axiosInstance.patch(
    `/org/${orgId}/admins/${userId}/demote`,
  );
  return response.data;
};

type UseDemoteAdminConfig = MutationConfig<typeof demoteAdmin>;

export const useDemoteAdmin = (mutationConfig?: UseDemoteAdminConfig) => {
  const { onSuccess, ...restConfig } = mutationConfig || {}
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getOrgMemberQueryKey() });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: demoteAdmin,
  });
};
