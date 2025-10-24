export * from "./createEvent";
export * from "./getEvent";
export * from "./getVoters";

export const getEventQueryKey = () => ["events"];
export const getVotersQueryKey = (eventId?: string) => [
  "event-voters",
  eventId,
];
export const getCandidateQueryKey = (eventId?: string) => [
  "event-candidates",
  eventId,
];
