import { useMutation } from "@tanstack/react-query";
import authApi from "~/lib/api/auth/auth.api";
import { SignInType, SignUpType } from "~/type/auth";
import { MutationOptions } from "~/type/react-query";

export const authService = {
  SignIn(options?: MutationOptions<SignInType>) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return authApi.signIn(data);
      },
    });
  },

  SignUp(options?: MutationOptions<SignUpType>) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return authApi.signUp(data);
      },
    });
  },

  SignOut(options?: MutationOptions) {
    return useMutation({
      ...options,
      mutationFn() {
        return authApi.signOut();
      },
    });
  },
};
