import { queryOptions, useQuery } from "@tanstack/react-query"
import { axiosInstance, HttpResponse } from "../api"
import { QueryConfig } from "~/lib/query-client"

type EventStatus = {
  id: number,
  name: string
}
const getEventStatuses = async () => {
  const response = await axiosInstance.get<HttpResponse<EventStatus[]>>('/events/event-statuses')
  return response.data
}

const getEventStatusesOpts = () => {
  return queryOptions({
    queryKey: ["event-statuses"],
    queryFn: getEventStatuses
  })
}

type UseGetEventStatusConfig = QueryConfig<typeof getEventStatusesOpts>

export const useGetEventStatuses = (queryConfig: UseGetEventStatusConfig = {}) => {
  return useQuery({
    ...getEventStatusesOpts(),
    ...queryConfig
  })
}
