import { OrgMemberRole } from "~/type/org.type";
import { axiosInstance, HttpResponse } from "../api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/query-client";

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
  hasNext: boolean;
  hasPrev: boolean;
};

type UnregisteredVoters = {
  members: Members;
  pagination: Pagination;
};

export const getUnregisteredVoter = async (eventId: string) => {
  const response = await axiosInstance.get<HttpResponse<UnregisteredVoters>>(
    `/events/${eventId}/unregistered-voters`,
  );
  return response.data;
};

const getUnregisteredVoterOpts = (eventId: string) => {
  return queryOptions({
    queryKey: [],
    queryFn: () => getUnregisteredVoter(eventId),
  });
};

type UseGetUnregisteredVoterConfig = {
  eventId: string;
  queryConfig: QueryConfig<typeof getUnregisteredVoterOpts>;
};

export const useGetUnregisteredVoters = (
  params: UseGetUnregisteredVoterConfig,
) => {
  return useQuery({
    ...params.queryConfig,
    ...getUnregisteredVoterOpts(params.eventId),
  });
};
