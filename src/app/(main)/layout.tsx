"use client";
import React, { PropsWithChildren } from "react";
import { ThemeProvider } from "~/components/theme-provider";
import LandingPage from "./landing/page";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const session = false;

  return (
    <>
      {session ? (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default MainLayout;
