export * from "./createEvent";
export * from "./getEvent";
export * from "./getVoters";

export const getEventQueryKey = () => ["events"];
export const getVotersQueryKey = () => ["event-voters",];
export const getUnregisteredVotersQueryKey = () => ["unregistered-voters"]
export const getCandidateQueryKey = () => ["event-candidates",];
export const getVoteTokenQueryKey = () => ["vote-token",];
