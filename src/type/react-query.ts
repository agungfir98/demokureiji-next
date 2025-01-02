import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IApiResponse } from "./httpResponse";

export type MutationOptions<T = void> = Omit<
  UseMutationOptions<AxiosResponse<IApiResponse>, AxiosError<IApiResponse>, T>,
  "mutationFn"
>;

export type QueryOptions<TData = any, TError = any> = Omit<
  UseQueryOptions<
    any,
    AxiosError<IApiResponse<TData, TError>>,
    AxiosResponse<IApiResponse<TData, TError>>
  >,
  "queryFn"
>;
