import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/query-client";
import { PaginationQueryType } from "~/schema/query";
import { axiosInstance, HttpResponse } from "../api";
import { getOrgEventQueryKey } from ".";

type GetOrgEventRequest = {
  orgId: string;
  query: PaginationQueryType;
};

type GetOrgEventsResponse = {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  status: string;
  startDate: Date;
  endDate: Date;
  allowAbstain: boolean;
  requiresRegistration: boolean;
  finishedAt: Date;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getOrgEvents = async (payload: GetOrgEventRequest) => {
  const response = await axiosInstance.get<
    HttpResponse<GetOrgEventsResponse[]>
  >(`/org/${payload.orgId}/events`, {
    params: { ...payload.query },
  });
  return response.data;
};

const getOrgEventsQueryOpts = (payload: GetOrgEventRequest) => {
  return queryOptions({
    queryKey: getOrgEventQueryKey(),
    queryFn: () => getOrgEvents(payload),
  });
};

type UseGetOrganizationEventConfig = {
  queryConfig?: QueryConfig<typeof getOrgEventsQueryOpts>;
  payload: GetOrgEventRequest;
};

export const useGetOrgEvents = (params: UseGetOrganizationEventConfig) => {
  return useQuery({
    ...getOrgEventsQueryOpts(params.payload),
    ...params.queryConfig,
  });
};
