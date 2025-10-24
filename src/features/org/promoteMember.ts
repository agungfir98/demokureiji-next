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

export const usePromoteMember = (mutationConfig: UserPromoteMemberConfig) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: promoteMember,
    onSuccess: (data, variables, ctx) => {
      queryClient.invalidateQueries({ queryKey: getOrgMemberQueryKey() });
      mutationConfig.onSuccess?.(data, variables, ctx);
    },
  });
};
