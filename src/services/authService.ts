import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import authApi from "~/lib/api/auth/auth.api";
import { SignInType, SignUpType } from "~/type/auth";
import { IApiResponse } from "~/type/httpResponse";

export const authService = {
  SignIn(
    options?: Omit<
      UseMutationOptions<unknown, AxiosError<IApiResponse>, SignInType>,
      "mutationFn"
    >
  ) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return authApi.signIn(data);
      },
    });
  },

  SignUp(
    options?: Omit<
      UseMutationOptions<unknown, AxiosError<IApiResponse>, SignUpType>,
      "mutationFn"
    >
  ) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return authApi.signUp(data);
      },
    });
  },

  SignOut(
    options?: Omit<
      UseMutationOptions<unknown, AxiosError<IApiResponse>>,
      "mutationFn"
    >
  ) {
    return useMutation({
      ...options,
      mutationFn() {
        return authApi.signOut();
      },
    });
  },
};
