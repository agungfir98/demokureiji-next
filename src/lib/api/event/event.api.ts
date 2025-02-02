import { NewEventType } from "~/type/event";
import { axiosInstance } from "../api";

class EventApi {
  newEvent(orgId: string, payload: NewEventType) {
    return axiosInstance.post(`/event/new`, { orgId, ...payload });
  }

  getEvent({ eventId }: { eventId: string }) {
    return axiosInstance.get(`/event/${eventId}`);
  }
}

const eventApi = new EventApi();
export default eventApi;
