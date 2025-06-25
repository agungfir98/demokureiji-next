import axios from "axios";
import useAuthStore from "~/hooks/useAuth";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    config.headers.Authorization = `Brearer ${token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
