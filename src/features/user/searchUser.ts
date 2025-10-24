import { QueryConfig } from "~/lib/query-client";
import { axiosInstance, HttpResponse } from "../api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { userKey } from ".";

export type SearchUserResponse = {
  id: string;
  email: string;
  name: string;
  tokenVersion: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: boolean;
};

export const searchUser = async (value: string) => {
  const response = await axiosInstance.get<HttpResponse<SearchUserResponse[]>>(
    `/user?search=${value}`,
  );
  return response.data;
};

const searchUserQueryOpts = (value: string) => {
  return queryOptions({
    queryKey: [userKey, value],
    queryFn: () => searchUser(value),
  });
};

type UseSearchUserConfig = {
  value: string;
  queryConfig?: QueryConfig<typeof searchUserQueryOpts>;
};

export const useSearchUser = ({ value, queryConfig }: UseSearchUserConfig) => {
  return useQuery({
    ...searchUserQueryOpts(value),
    ...queryConfig,
  });
};
