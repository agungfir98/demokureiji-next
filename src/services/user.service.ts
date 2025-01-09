import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "~/type/react-query";
import userApi from "~/lib/api/user/user.api";
import { IUser } from "~/type/httpResponse";
import { axiosInstance } from "~/lib/api/api";

export const userService = {
  SearchUser({ value }: { value: string }, options?: QueryOptions<IUser[]>) {
    return useQuery({
      ...options,
      queryKey: ["searchUser", value],
      queryFn() {
        return userApi.searchUser({ value });
      },
      refetchOnWindowFocus: false,
    });
  },

  GetUser({ userId }: { userId: string }, options?: QueryOptions) {
    return useQuery({
      ...options,
      queryKey: ["user", userId],
      queryFn() {
        return axiosInstance.get(`/user/${userId}`);
      },
    });
  },
};
