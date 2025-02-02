/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiResponse<TData = any, TError = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: TData;
  error?: TError;
  timestamp: string;
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
}

export interface IEvent<User = string, Org = string> extends Document {
  _id: string;
  voteTitle: string;
  holder: Org;
  isActive: boolean;
  status: "inactive" | "active" | "finished";
  finishedDate: Date;
  candidates: User[];
  registeredVoters: User[];
}
