import { useMutation, useQuery } from "@tanstack/react-query";
import orgApi from "~/lib/api/org/org.api";
import { IEvent, IOrganization, IUser } from "~/type/httpResponse";
import { NewOrgType } from "~/type/org";
import { MutationOptions, QueryOptions } from "~/type/react-query";

export const orgService = {
  getOrganizations(options?: QueryOptions<IUser<IOrganization>>) {
    return useQuery({
      ...options,
      queryKey: ["organization"],
      queryFn() {
        return orgApi.getOrg();
      },
      refetchOnWindowFocus: false,
    });
  },

  getSingleOrg(
    { orgId }: { orgId: string },
    options?: QueryOptions<
      IOrganization<IUser, IEvent> & { isAdmin: boolean; userId: string }
    >
  ) {
    return useQuery({
      ...options,
      queryKey: ["orgDetail", orgId],
      queryFn() {
        return orgApi.getSingleOrg(orgId);
      },
      refetchOnWindowFocus: false,
      retry: false,
    });
  },

  newOrganization(options?: MutationOptions<NewOrgType>) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return orgApi.newOrg(data);
      },
    });
  },
};
