import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { QueryConfig } from "~/lib/query-client";
import { OrgMemberRole } from "~/type/org.type";
import { axiosInstance, HttpResponse } from "../api";

export type GetSingleOrgResponse = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: OrgMemberRole;
};

export const getSingleOrg = async (orgId: string) => {
  const response = await axiosInstance.get<HttpResponse<GetSingleOrgResponse>>(
    `/org/${orgId}`,
  );
  return response.data;
};

const getSingleOrgQueryOpts = (orgId: string) => {
  return queryOptions({
    queryKey: [orgId],
    queryFn: () => getSingleOrg(orgId),
  });
};

type UseGetSingleOrgParams = {
  orgId: string;
  queryConfig?: QueryConfig<typeof getSingleOrgQueryOpts>;
};

export const useGetSingleOrg = ({
  queryConfig,
  orgId,
}: UseGetSingleOrgParams) => {
  return useSuspenseQuery({
    ...getSingleOrgQueryOpts(orgId),
    ...queryConfig,
  });
};
