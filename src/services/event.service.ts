import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import eventApi from "~/lib/api/event/event.api";
import { NewEventType } from "~/type/event";
import { IEvent, IOrganization, IUser } from "~/type/httpResponse";
import { MutationOptions, QueryOptions } from "~/type/react-query";

class EventService {
  NewEvent(options?: MutationOptions<{ orgId: string; data: NewEventType }>) {
    return useMutation({
      ...options,
      mutationFn({ orgId, data }) {
        return eventApi.newEvent(orgId, data);
      },
    });
  }

  GetEvent(
    eventId: string,
    options?: QueryOptions<IEvent<IUser, IOrganization>>
  ) {
    return useSuspenseQuery({
      ...options,
      queryKey: ["event-detail", options?.queryKey],
      queryFn() {
        return eventApi.getEvent({ eventId });
      },
      refetchOnWindowFocus: false,
      retry: false,
    });
  }
}

const eventService = new EventService();
export default eventService;
