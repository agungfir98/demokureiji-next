import { MutationConfig } from "~/lib/query-client";
import { axiosInstance } from "../api";
import { useMutation } from "@tanstack/react-query";

export const signOut = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

type UseSignOutConfig = MutationConfig<typeof signOut>;

export const useSignOut = (mutationConfig: UseSignOutConfig) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: () => signOut(),
  });
};
