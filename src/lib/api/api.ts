import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true,
  headers: {},
});

// export const headers = (token?: string): Partial<AxiosHeaders> => ({
//   Authorization: token ? `Brearer ${token}` : "",
//   "Content-Type": "application/json",
// });
