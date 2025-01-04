"use server";
import React, { PropsWithChildren, ReactNode } from "react";

import { getSession } from "~/lib/session";
import { QueryProvider } from "~/components/query-provider";
import { Toaster } from "~/components/ui/sonner";

const MainLayout: React.FC<
  PropsWithChildren & { landing: ReactNode }
> = async ({ children, landing }) => {
  const user = await getSession();

  return (
    <>
      {user ? (
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      ) : (
        landing
      )}
    </>
  );
};

export default MainLayout;
