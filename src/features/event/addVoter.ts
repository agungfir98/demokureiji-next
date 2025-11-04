import z from "zod";
import { axiosInstance, HttpResponse } from "../api";
import { setIdempotenHeader } from "~/lib/utils";
import { MutationConfig, queryClient } from "~/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { getUnregisteredVotersQueryKey, getVotersQueryKey } from ".";

export const votersSchema = z.array(z.string().uuid());
export type Voters = z.infer<typeof votersSchema>
type Votersparams = {
  payload: Voters,
  eventId: string
}
export const addVoters = async (params: Votersparams) => {
  const response = await axiosInstance.post<HttpResponse>(`/events/${params.eventId}/voters`, params.payload,
    {
      headers: {
        ...setIdempotenHeader(crypto.randomUUID())
      }
    }
  )
  return response.data
}

type UseAddVoterConfig = MutationConfig<typeof addVoters>


export const useAddVoters = (mutationConfig?: UseAddVoterConfig) => {
  const { onSuccess, ...restConfig } = mutationConfig || {}
  return useMutation({
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: getUnregisteredVotersQueryKey() })
      queryClient.invalidateQueries({ queryKey: getVotersQueryKey() })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: addVoters

  })
}

