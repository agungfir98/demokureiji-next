import {
  QueryKey,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { queryClient } from "~/components/query-provider";
import eventApi from "~/lib/api/event/event.api";
import { NewEventType, VotersQueryType } from "~/type/event";
import { IEvent } from "~/type/httpResponse";
import { MutationOptions } from "~/type/react-query";

const eventService = {
  NewEvent(options?: MutationOptions<{ orgId: string; data: NewEventType }>) {
    return useMutation({
      ...options,
      mutationFn({ orgId, data }) {
        return eventApi.newEvent(orgId, data);
      },
    });
  },

  GetEvent(eventId: string, params: { orgId: string }, queryKey?: string[]) {
    return useQuery({
      queryKey: ["event-detail", queryKey],
      queryFn: async () => eventApi.getEvent({ eventId }, { params }),
      refetchOnWindowFocus: false,
      retry: false,
    });
  },

  GetEventVoters(
    { eventId, orgId }: { eventId: string; orgId: string },
    params: VotersQueryType,
    queryKey: QueryKey
  ) {
    return useSuspenseQuery({
      queryKey: ["event-voters", ...queryKey],
      queryFn: async () => {
        const data = await eventApi.getEventVoters(
          { eventId },
          { params: { ...params, orgId } }
        );
        return data.data;
      },
      refetchOnWindowFocus: false,
      retry: false,
    });
  },

  UpdateEventStatus(orgId: string, eventId: string) {
    return useMutation({
      mutationKey: ["event-start"],
      mutationFn: ({ status }: { status: IEvent["status"] }) =>
        eventApi.updateEvent({ orgId, eventId, status }),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["event-detail"] });
      },
      retry: false,
    });
  },

  Vote(options?: MutationOptions<{ orgId: string, eventId: string, candidateId: string }>) {
    return useMutation({
      ...options,
      mutationFn: ({ orgId, candidateId, eventId }) => {
        return eventApi.vote({ eventId, candidateId }, { params: { orgId } });
      },
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["event-detail"] })
      },
    })
  }
};

export default eventService;
