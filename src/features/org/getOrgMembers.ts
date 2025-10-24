import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/query-client";
import { OrgMemberQueryType } from "~/schema/org";
import { OrgMemberRole } from "~/type/org.type";
import { getOrgMemberQueryKey } from ".";
import { axiosInstance, HttpResponse } from "../api";

type GetOrgMembersRequest = {
  orgId: string;
  query?: OrgMemberQueryType;
};

export type OrgMembersResponse = {
  members: {
    role: OrgMemberRole;
    createdAt: Date;
    id: string;
    name: string;
    email: string;
  }[];
  pagination: {
    totalMembers: number;
    totalPages: number;
    limit: number;
    currentPage: number;
    hasNextpage: boolean;
    hasPrevPage: boolean;
  };
};
export const getOrgMembers = async (payload: GetOrgMembersRequest) => {
  const response = await axiosInstance.get<HttpResponse<OrgMembersResponse>>(
    `/org/${payload.orgId}/members`,
    {
      params: { ...payload.query },
    },
  );
  return response.data;
};

const getOrgMembersOpts = (payload: GetOrgMembersRequest) => {
  return queryOptions({
    queryKey: [...getOrgMemberQueryKey(), payload.query],
    queryFn: () => getOrgMembers(payload),
  });
};

type UseGetOrgMembersConfig = {
  queryConfig?: QueryConfig<typeof getOrgMembersOpts>;
  payload: GetOrgMembersRequest;
};

export const useGetOrgMembers = (params: UseGetOrgMembersConfig) => {
  return useQuery({
    ...getOrgMembersOpts(params.payload),
    ...params.queryConfig,
  });
};
