"use server";
import React, { PropsWithChildren } from "react";

import { getSession } from "~/lib/session";
import LandingPage from "./landing/page";
import { QueryProvider } from "~/components/query-provider";
import { Toaster } from "~/components/ui/sonner";

const MainLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const user = await getSession();

  return (
    <>
      {user ? (
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default MainLayout;
