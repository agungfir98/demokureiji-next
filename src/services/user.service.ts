import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "~/type/react-query";
import userApi from "~/lib/api/user/user.api";
import { IUser } from "~/type/httpResponse";

export const userService = {
  SearchUser({ email }: { email: string }, options?: QueryOptions<IUser[]>) {
    return useQuery({
      ...options,
      queryKey: ["searchUser", email],
      queryFn() {
        return userApi.searchUser({ email });
      },
      refetchOnWindowFocus: false,
    });
  },
};
