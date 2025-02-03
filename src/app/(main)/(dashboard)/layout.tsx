"use client";
import { ThemeProvider } from "next-themes";
import React, { PropsWithChildren, ReactNode } from "react";

import { AppSidebar } from "~/components/app-sidebar";
import DynamicBreadCrumb from "~/components/dynamic-breadcrumb";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

const DashboardLayout: React.FC<PropsWithChildren & { modal: ReactNode }> = ({
  children,
  modal,
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="h-screen">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadCrumb />
            </div>
          </header>
          <div className="flex-grow gap-4 pt-0 bg-background overflow-hidden">
            <ScrollArea className="h-full overflow-auto px-4 ">
              <div className="grid gap-4">
                <Card>{children}</Card>
              </div>
              {modal}
            </ScrollArea>
          </div>
          <footer className="py-4 flex justify-center items-center">
            <p className="text-xs opacity-65">
              &copy; Demokureiji - by Agung Dev
            </p>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
