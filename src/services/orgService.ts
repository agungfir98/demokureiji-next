import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import orgApi from "~/lib/api/org/org.api";
import { IEvent, IOrganization, IUser } from "~/type/httpResponse";
import { NewOrgType, OrgQueryType } from "~/type/org";
import { MutationOptions, QueryOptions } from "~/type/react-query";

export const orgService = {
  GetOrganizations(options?: QueryOptions<IUser<IOrganization>>) {
    return useSuspenseQuery({
      ...options,
      queryKey: ["organization"],
      queryFn() {
        return orgApi.getOrg();
      },
      refetchOnWindowFocus: false,
    });
  },

  GetSingleOrg(
    { orgId }: { orgId: string },
    params: OrgQueryType,
    options?: QueryOptions<
      IOrganization<IUser, IEvent> & {
        role: IOrganization["members"][0]["role"];
        userId: string;
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      }
    >
  ) {
    return useSuspenseQuery({
      ...options,
      queryKey: ["orgDetail", orgId, ...options!.queryKey],
      queryFn() {
        return orgApi.getSingleOrg(orgId, params);
      },
      refetchOnWindowFocus: false,
      retry: false,
    });
  },

  NewOrganization(options?: MutationOptions<NewOrgType>) {
    return useMutation({
      ...options,
      mutationFn(data) {
        return orgApi.newOrg(data);
      },
    });
  },

  NewMember(options?: MutationOptions<{ orgId: string; userId: string }>) {
    return useMutation({
      ...options,
      mutationFn({ userId, orgId }) {
        return orgApi.newMember({ orgId, userId });
      },
    });
  },

  KickMember(options?: MutationOptions<{ orgId: string; userId: string }>) {
    return useMutation({
      ...options,
      mutationFn({ userId, orgId }) {
        return orgApi.kickMember({ orgId, userId });
      },
    });
  },

  DemoteAdmin(options?: MutationOptions<{ orgId: string; userId: string }>) {
    return useMutation({
      ...options,
      mutationFn({ userId, orgId }) {
        return orgApi.demoteAdmin({ orgId, userId });
      },
    });
  },

  PromoteMember(options?: MutationOptions<{ orgId: string; userId: string }>) {
    return useMutation({
      ...options,
      mutationFn({ userId, orgId }) {
        return orgApi.promoteMember({ orgId, userId });
      },
    });
  },
};
