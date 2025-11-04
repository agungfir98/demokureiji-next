import { MutationConfig, queryClient } from "~/lib/query-client";
import { axiosInstance } from "../api";
import { useMutation } from "@tanstack/react-query";
import { getOrgMemberQueryKey } from ".";

export const promoteMember = async ({
  orgId,
  userId,
}: {
  userId: string;
  orgId: string;
}) => {
  const response = await axiosInstance.patch(
    `/org/${orgId}/members/${userId}/promote`,
  );
  return response.data;
};

type UserPromoteMemberConfig = MutationConfig<typeof promoteMember>;

export const usePromoteMember = (mutationConfig?: UserPromoteMemberConfig) => {
  const { onSuccess, ...restConfig } = mutationConfig || {}
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: getOrgMemberQueryKey() });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: promoteMember,
  });
};
