import { OrgMemberRole } from "~/type/org.type";
import { axiosInstance, HttpResponse } from "../api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/query-client";
import { SearchAndPaginateType } from "~/schema/query";

type Members = {
  memberId: string;
  memberRole: OrgMemberRole;
  isActive: true;
  joinedAt: Date;
  userId: string;
  name: string;
  email: string;
};

type Pagination = {
  page: number;
  limit: number;
  totalMembers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type UnregisteredVoters = {
  members: Members[];
  pagination: Pagination;
};

type UnregisteredVotersReq = {
  eventId: string;
  query: SearchAndPaginateType;
};

export const getUnregisteredVoter = async (params: UnregisteredVotersReq) => {
  const response = await axiosInstance.get<HttpResponse<UnregisteredVoters>>(
    `/events/${params.eventId}/voters/unregistered`,
    { params: { ...params.query } },
  );
  return response.data;
};

const getUnregisteredVoterOpts = (params: UnregisteredVotersReq) => {
  return queryOptions({
    queryKey: [params.query],
    queryFn: () => getUnregisteredVoter(params),
    retry: false,
  });
};

type UseGetUnregisteredVoterConfig = {
  params: UnregisteredVotersReq;
  queryConfig: QueryConfig<typeof getUnregisteredVoterOpts>;
};

export const useGetUnregisteredVoters = (
  params: UseGetUnregisteredVoterConfig,
) => {
  return useQuery({
    ...params.queryConfig,
    ...getUnregisteredVoterOpts(params.params),
  });
};
