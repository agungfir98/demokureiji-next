import { SignInType, SignUpType } from "~/type/auth";
import { axiosInstance } from "../api";

class AuthApi {
  signIn(data: SignInType) {
    return axiosInstance.post("/auth/login", data);
  }

  signUp(data: SignUpType) {
    return axiosInstance.post("/auth/signup", data);
  }
}

const authApi = new AuthApi();
export default authApi;
