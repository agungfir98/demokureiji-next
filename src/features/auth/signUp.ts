import { z } from "zod";
import { axiosInstance } from "../api";
import { MutationConfig } from "~/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const message = {
  empty: "Password must not be empty",
  minLen: "Password must contain at least 6 characters",
  mismatch: "Password doesn't match",
};

export const signUpSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1, message.empty),
    password: z.string().min(6, message.minLen),
    confirmPassword: z.string().min(6, message.minLen),
  })
  .refine((check) => check.password === check.confirmPassword, {
    message: message.mismatch,
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof signUpSchema>;

export const signUp = async (data: SignUpType) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

type UseSignUpConfig = MutationConfig<typeof signUp>;

export const useSignUp = (mutationConfig: UseSignUpConfig) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: signUp,
  });
};
