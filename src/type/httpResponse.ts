/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
  error?: any;
  timestamp: string;
}
