"use client";

import { Frame, GalleryVerticalEnd, Home, Map, PieChart } from "lucide-react";
import * as React from "react";
import jwt from "jsonwebtoken";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import useAuthStore from "~/hooks/useAuth";
import { NavHeader } from "./nav-header";
import { NavOrg } from "./nav-organization";
import { ScrollArea } from "./ui/scroll-area";

const data = {
  header: {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "Organization",
          url: "/org",
        },
      ],
    },
  ],
  organizations: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { token } = useAuthStore();
  const decoded: jwt.JwtPayload = jwt.decode(token as string) as jwt.JwtPayload;
  const user = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea>
          <NavMain items={data.navMain} />
          <NavOrg organization={data.organizations} />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
