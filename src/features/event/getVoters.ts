import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/query-client";
import { OrgMemberQueryType } from "~/schema/org";
import { getVotersQueryKey } from ".";
import { axiosInstance, HttpResponse } from "../api";

type GetVotersRequest = {
  eventId: string;
  query: OrgMemberQueryType;
};

type VotersResponse = {
  voters: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  pagination: {
    totalVoters: number;
    totalPages: number;
    limit: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export const getVoters = async (payload: GetVotersRequest) => {
  const response = await axiosInstance.get<HttpResponse<VotersResponse>>(
    `/events/${payload.eventId}/voters`,
    {
      params: { ...payload.query },
    },
  );
  return response.data;
};

const getVotersQueryConfig = (req: GetVotersRequest) => {
  return queryOptions({
    queryKey: [getVotersQueryKey(req.eventId), req.query],
    queryFn: () => getVoters(req),
  });
};

type UseGetVotersConfig = {
  request: GetVotersRequest;
  queryConfig?: QueryConfig<typeof getVotersQueryConfig>;
};

export const useGetVoters = (params: UseGetVotersConfig) => {
  return useQuery({
    ...getVotersQueryConfig(params.request),
    ...params.queryConfig,
  });
};
