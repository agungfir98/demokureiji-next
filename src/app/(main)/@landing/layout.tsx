"use server";

import { PropsWithChildren } from "react";
import LandingNav from "~/components/landingNav";

const LandingLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <LandingNav />
      {children}
    </div>
  );
};

export default LandingLayout;
