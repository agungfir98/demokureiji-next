import axios from "axios";
import useAuthStore from "~/hooks/useAuth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpResponse<TData = any> = {
  success: boolean;
  message: string;
  data: TData;
  timestamp: string;
};

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URI}/v2`,
  withCredentials: true,
  headers: {},
});

axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
