import { useMutation } from "@tanstack/react-query";
import authApi from "~/lib/api/auth/auth.api";
import { SignInType, SignUpType } from "~/type/auth";
import { OptionsQuery } from "~/type/react-query";

export const authService = {
  SignIn(options?: OptionsQuery<SignInType>) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return authApi.signIn(data);
      },
    });
  },

  SignUp(options?: OptionsQuery<SignUpType>) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return authApi.signUp(data);
      },
    });
  },

  SignOut(options?: OptionsQuery) {
    return useMutation({
      ...options,
      mutationFn() {
        return authApi.signOut();
      },
    });
  },
};
