import { axiosInstance } from "../api";

class UserApi {
  searchUser({ email }: { email: string }) {
    return axiosInstance.get(`/user/search?email=${email}`);
  }
}

const userApi = new UserApi();
export default userApi;
