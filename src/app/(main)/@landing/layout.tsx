"use server";

import { PropsWithChildren } from "react";
import LandingNav from "~/components/landingNav";

const LandingLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="">
      <LandingNav />
      {children}
    </div>
  );
};

export default LandingLayout;
