"use server";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { QueryProvider } from "~/components/query-provider";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { getSession } from "~/lib/session";

const AuthLayout: React.FC<PropsWithChildren> = async ({ children }) => {
  const user = await getSession();

  if (user) {
    return redirect("/");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  );
};

export default AuthLayout;
