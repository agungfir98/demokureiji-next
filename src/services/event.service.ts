import { useMutation } from "@tanstack/react-query";
import eventApi from "~/lib/api/event/event.api";
import { NewEventType } from "~/type/event";
import { MutationOptions } from "~/type/react-query";

class EventService {
  NewEvent(options?: MutationOptions<{ orgId: string; data: NewEventType }>) {
    return useMutation({
      ...options,
      mutationFn({ orgId, data }) {
        return eventApi.newEvent({ orgId, data });
      },
    });
  }
}

const eventService = new EventService();
export default eventService;
