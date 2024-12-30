"use client";
import React, { PropsWithChildren } from "react";
import { QueryProvider } from "~/components/query-provider";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
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
