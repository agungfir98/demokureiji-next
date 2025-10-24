import { queryOptions, useQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/query-client";
import { EventStatus } from "~/type/event.type";
import { OrgMemberRole } from "~/type/org.type";
import { axiosInstance, HttpResponse } from "../api";

type Event = {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  status: EventStatus;
  startDate: Date | null;
  endDate: Date | null;
  allowAbstain: boolean;
  finishedAt: Date | null;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date | null;
  hasVoted: boolean;
  role: OrgMemberRole;
};

export const getEvent = async (eventId: string) => {
  const response = await axiosInstance.get<HttpResponse<Event>>(
    `/events/${eventId}`,
  );
  return response.data;
};

const getEventQueryOpts = (eventId: string) => {
  return queryOptions({
    queryKey: [eventId],
    queryFn: () => getEvent(eventId),
  });
};

type UseGetEventConfig = {
  eventId: string;
  queryConfig?: QueryConfig<typeof getEventQueryOpts>;
};

export const useGetEvent = (params: UseGetEventConfig) => {
  return useQuery({
    ...getEventQueryOpts(params.eventId),
    ...params.queryConfig,
  });
};
