/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiResponse<TData = any, TError = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: TData;
  error?: TError;
  timestamp: string;
}

export type OrgMember = Pick<
  IUser & { role: string },
  "name" | "email" | "_id" | "role"
>[];

export interface PaginatedMembers {
  members: OrgMember;
  pagination: PaginatedResponse & { totalMembers: number };
}

export interface PaginatedEvents {
  events: Pick<IEvent, "_id" | "voteTitle" | "isActive" | "status">[];
  pagination: PaginatedResponse & { totalMembers: number };
}

export interface PaginatedResponse {
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IUser<Org = string, Event = string> extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  organization: Org[];
  voteParticipation: Event[];
  tokenVersion: number;
}

export interface IOrganization<User = string, Event = string> extends Document {
  _id: string;
  organization: string;
  members: { member: User; role: "master" | "admin" | "member" }[];
  paginatedMembers: { member: User; role: "master" | "admin" | "member" }[];
  description: string;
  voteevents: Event[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent<User = string, Org = string> {
  _id: string;
  voteTitle: string;
  holder: Org;
  isActive: boolean;
  status: "inactive" | "active" | "finished";
  finishedDate: Date;
  candidates: ICandidate[];
  registeredVoters: {
    voter: User;
    hasVoted: boolean;
  }[];
}

export interface ICandidate {
  calonKetua: string;
  calonWakil: string;
  description: string;
  numOfVotes: number;
  _id: string;
}

export type EventDetail = IApiResponse<
  IEvent & { role: IOrganization["members"][0]["role"] }
>;

export type PaginatedVoters = IApiResponse<{
  voters: Pick<
    IUser & { hasVoted: boolean },
    "_id" | "name" | "email" | "hasVoted"
  >[];
  pagination: PaginatedResponse & { totalVoters: number };
}>;

export type UserOrgs = IApiResponse<{
  organization: Pick<IOrganization, "organization" | "_id" | "description">[];
}>;
