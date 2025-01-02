/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiResponse<TData = any, TError = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: TData;
  error?: TError;
  timestamp: string;
}
