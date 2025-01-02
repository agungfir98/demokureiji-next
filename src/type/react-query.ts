import { UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { IApiResponse } from "./httpResponse";

export type OptionsQuery<T = void> = Omit<
  UseMutationOptions<AxiosResponse<IApiResponse>, AxiosError<IApiResponse>, T>,
  "mutationFn"
>;
