import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useAuthStore from "~/hooks/useAuth";
import authApi from "~/lib/api/auth/auth.api";
import { SignInType, SignUpType } from "~/type/auth";
import { IApiResponse } from "~/type/httpResponse";

class AuthService {
  signIn(
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
  }

  signUp(
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
  }

  async signOut() {
    const { setToken } = useAuthStore();
    return setToken(null);
  }
}

const authService = new AuthService();
export default authService;
