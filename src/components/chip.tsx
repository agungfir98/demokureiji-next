import React, { PropsWithChildren } from "react";

const Chip: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <span className="px-3 py-1 bg-[#2C2C2C] border border-[#3C3C3C] rounded text-sm text-gray-300">
      {children}
    </span>
  );
};

export default Chip;
