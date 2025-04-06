import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import orgApi from "~/lib/api/org/org.api";
import {
  IOrganization,
  PaginatedEvents,
  PaginatedMembers,
} from "~/type/httpResponse";
import { NewOrgType, OrgMemberQueryType } from "~/type/org";
import { PaginationQueryType } from "~/type/query";
import { MutationOptions, QueryOptions } from "~/type/react-query";

export const orgService = {
  GetOrganizations() {
    return useQuery({
      queryKey: ["organization"],
      queryFn: () => orgApi.getUserOrg(),
      refetchOnWindowFocus: false,
      retry: false,
    });
  },

  GetSingleOrg(
    { orgId }: { orgId: string },
    options?: QueryOptions<
      Pick<IOrganization, "organization" | "_id" | "description"> &
        Pick<IOrganization["members"][0], "role">
    >
  ) {
    return useSuspenseQuery({
      ...options,
      queryKey: ["org-detail", orgId],
      queryFn() {
        return orgApi.getSingleOrg(orgId);
      },
      refetchOnWindowFocus: false,
      retry: false,
    });
  },

  GetOrgMembers(
    { orgId }: { orgId: string },
    { params }: { params: OrgMemberQueryType },
    options?: QueryOptions<PaginatedMembers>
  ) {
    return useSuspenseQuery({
      ...options,
      queryKey: ["org-members", orgId, ...options!.queryKey],
      queryFn() {
        return orgApi.getOrgMembers(orgId, params);
      },
      refetchOnWindowFocus: false,
      retry: false,
    });
  },

  GetOrgEvents(
    { orgId }: { orgId: string },
    { params }: { params: PaginationQueryType },
    options?: QueryOptions<PaginatedEvents>
  ) {
    return useSuspenseQuery({
      ...options,
      queryKey: ["org-events", orgId, ...options!.queryKey],
      queryFn() {
        return orgApi.getOrgEvents(orgId, params);
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
