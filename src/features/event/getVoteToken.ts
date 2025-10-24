import { queryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance, HttpResponse } from "../api";
import { QueryConfig } from "~/lib/query-client";
import { getVoteTokenQueryKey } from ".";

type GetVoteTokenResponse = {
  voteToken: string;
};

export const getVoteToken = async (eventId: string) => {
  const response = await axiosInstance.get<HttpResponse<GetVoteTokenResponse>>(
    `/events/${eventId}/vote-token`,
  );
  return response.data;
};

const useGetVoteTokenOpts = (eventId: string) => {
  return queryOptions({
    queryKey: getVoteTokenQueryKey(eventId),
    queryFn: () => getVoteToken(eventId),
    enabled: !!eventId,
  });
};

type UseGetVoteTokenConfig = {
  eventId: string;
  queryConfig?: QueryConfig<typeof useGetVoteTokenOpts>;
};

export const useGetVoteToken = (params: UseGetVoteTokenConfig) => {
  return useQuery({
    ...useGetVoteTokenOpts(params.eventId),
    ...params.queryConfig,
  });
};
