import { isAxiosError } from "axios";
import { NewEventType, VotersQueryType } from "~/type/event";
import { EventDetail, IEvent, PaginatedVoters } from "~/type/httpResponse";
import { axiosInstance } from "../api";

class EventApi {
  newEvent(orgId: string, payload: NewEventType) {
    return axiosInstance.post(`/event/new`, { orgId, ...payload });
  }

  async getEvent(
    { eventId }: { eventId: string },
    { params }: { params: { orgId: string } }
  ) {
    try {
      const response = await axiosInstance.get<EventDetail>(
        `/event/${eventId}`,
        { params }
      );
      return response.data.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw error;
      }
    }
  }

  getEventVoters(
    { eventId }: { eventId: string },
    { params }: { params: VotersQueryType & { orgId: string } }
  ) {
    return axiosInstance.get<PaginatedVoters>(`/event/${eventId}/voters`, {
      params,
    });
  }

  async updateEvent({
    orgId,
    eventId,
    status,
  }: {
    eventId: string;
    orgId: string;
    status: IEvent["status"];
  }) {
    try {
      return await axiosInstance.put(
        `/event/${eventId}`,
        {},
        { params: { orgId, status } }
      );
    } catch (error) {
      throw error;
    }
  }

  async vote({ eventId, candidateId }: { eventId: string, candidateId: string }, { params }: { params: { orgId: string } }) {
    try {
      return await axiosInstance.post(`/event/${eventId}/vote`, { candidateId }, { params })
    } catch (error) {
      throw error
    }
  }
}

const eventApi = new EventApi();
export default eventApi;
