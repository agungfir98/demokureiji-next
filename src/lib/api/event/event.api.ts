import { NewEventType } from "~/type/event";
import { axiosInstance } from "../api";

class EventApi {
  newEvent({ orgId, data }: { orgId: string; data: NewEventType }) {
    return axiosInstance.post(`/org/${orgId}/event/new`, data);
  }
}

const eventApi = new EventApi();
export default eventApi;
