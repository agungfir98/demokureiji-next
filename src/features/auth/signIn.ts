import { z } from "zod";
import { axiosInstance, HttpResponse } from "../api";
import { MutationConfig } from "~/lib/query-client";
import { useMutation } from "@tanstack/react-query";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Name must not be empty"),
});
export type SignInType = z.infer<typeof signInSchema>;

export type SignInResponse = {
  token: string;
};

export const signIn = async (data: SignInType) => {
  const response = await axiosInstance.post<HttpResponse<SignInResponse>>(
    "/auth/login",
    data,
  );
  return response.data;
};

type UseSignInConfig = MutationConfig<typeof signIn>;

export const useSignIn = (mutationConfig: UseSignInConfig) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: signIn,
  });
};
