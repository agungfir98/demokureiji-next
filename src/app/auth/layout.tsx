"use client";
import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "~/components/theme-provider";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default AuthLayout;
