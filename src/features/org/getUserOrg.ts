import { QueryConfig } from "~/lib/query-client";
import { axiosInstance, HttpResponse } from "../api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getOrgQueryKey } from ".";

type UserOrgResponse = {
  organization: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  userRole: "admin" | "member" | "master";
  totalMembers: number;
};

export const getUserOrg = async () => {
  const response =
    await axiosInstance.get<HttpResponse<UserOrgResponse[]>>("/org");
  return response.data;
};

type UseGetUserOrgConfig = {
  queryConfig?: QueryConfig<typeof getUserOrg>;
};

const getUserOrgQueryOpts = () => {
  return queryOptions({
    queryKey: getOrgQueryKey(),
    queryFn: getUserOrg,
  });
};

export const useGetUserOrg = (params: UseGetUserOrgConfig = {}) => {
  return useQuery({
    ...getUserOrgQueryOpts(),
    ...params.queryConfig,
  });
};
