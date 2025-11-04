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
import { useGetUserOrg } from "~/features/org";

export const NavOrg = () => {
  const { data } = useGetUserOrg();
  const [max, setMax] = useState<number>(5);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Organization</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href="/org/create" passHref>
            <SidebarMenuButton asChild variant="outline">
              <div>
                <Plus />
                Create New Organization
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {data &&
          data?.data.slice(0, max).map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link href={`/org/${item.organization.id}`} passHref>
                <SidebarMenuButton asChild>
                  <div>
                    <UsersRound />
                    <span>{item.organization.name}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        <SidebarMenuItem>
          {max === data?.data.length ? (
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
                  if (data !== undefined) {
                    if (data.data.length < max + 5) {
                      return (max += data.data.length - max);
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
};
