"use client";

import { MoreHorizontal, Plus, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { orgService } from "~/services/orgService";

export function NavOrg() {
  const { data } = orgService.GetOrganizations();
  const [max, setMax] = useState<number>(5);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Organization</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href="/org/new" passHref>
            <SidebarMenuButton asChild variant="outline">
              <div>
                <Plus />
                Create New Organization
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {data?.data.data?.organization.slice(0, max).map((item, index) => (
          <SidebarMenuItem key={index}>
            <Link href={`/org/${item._id}`} passHref>
              <SidebarMenuButton asChild>
                <div>
                  <UsersRound />
                  <span>{item.organization}</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          {max === data?.data.data?.organization.length ? (
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => setMax(5)}
            >
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>less</span>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => {
                setMax((max) => {
                  if (data?.data.data !== undefined) {
                    if (data.data.data.organization.length < max + 5) {
                      return (max +=
                        data!.data.data!.organization.length - max);
                    }
                    return max + 5;
                  }
                  return max;
                });
              }}
            >
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>More</span>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
