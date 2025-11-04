import { queryOptions, useQuery } from "@tanstack/react-query";
import { axiosInstance, HttpResponse } from "../api";
import { getCandidateQueryKey } from ".";
import { QueryConfig } from "~/lib/query-client";

type Candidate = {
  id: string;
  name: string;
  email: string;
};
type CandidatesResponse = {
  id: string;
  eventId: string;
  organizationId: string;
  leader: Candidate;
  viceLeader: Candidate;
  number: number;
  visionMission: string;
  isActive: boolean;
};

export const getCandidates = async (eventId: string) => {
  const response = await axiosInstance.get<HttpResponse<CandidatesResponse[]>>(
    `/events/${eventId}/candidates`,
  );
  return response.data;
};

const getCandidatesQueryConfig = (eventId: string) => {
  return queryOptions({
    queryKey: getCandidateQueryKey(),
    queryFn: () => getCandidates(eventId),
  });
};

type UseGetCandidatesQueryConfig = {
  eventId: string;
  queryConfig?: QueryConfig<typeof getCandidatesQueryConfig>;
};

export const useGetCandidates = (params: UseGetCandidatesQueryConfig) => {
  return useQuery({
    ...getCandidatesQueryConfig(params.eventId),
    ...params.queryConfig,
  });
};
