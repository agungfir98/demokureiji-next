import { queryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance, HttpResponse } from "../api";
import { QueryConfig } from "~/lib/query-client";
import { Candidate } from "./getCandidates";

const ONE_SECOND_MILIS = 1000;

export type VoteStat = {
  id: string;
  leader: Candidate;
  viceLeader: Candidate;
  votesCount: number;
};

const getEventStats = async (eventId: string) => {
  const response = await axiosInstance.get<HttpResponse<VoteStat[]>>(
    `/events/${eventId}/event-stats`,
  );

  return response.data;
};

const useGetEventStatsOpts = (eventId: string) => {
  return queryOptions({
    queryKey: ["event-stats"],
    queryFn: () => getEventStats(eventId),
    refetchInterval: ONE_SECOND_MILIS * 60,
  });
};

type UseGetEventStatsConfig = {
  eventId: string;
  queryConfig?: QueryConfig<typeof useGetEventStatsOpts>;
};

export const useGetEventStats = (params: UseGetEventStatsConfig) => {
  return useQuery({
    ...useGetEventStatsOpts(params.eventId),
    ...params.queryConfig,
  });
};
