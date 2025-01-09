import { axiosInstance } from "../api";

class UserApi {
  searchUser({ value }: { value: string }) {
    return axiosInstance.get(`/user/search?search=${value}`);
  }
}

const userApi = new UserApi();
export default userApi;
