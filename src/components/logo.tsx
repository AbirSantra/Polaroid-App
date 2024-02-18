import React from "react";
import PolaroidLogo from "@/assets/polaroid-logo.png";

const Logo = () => {
  return (
    <div className="my-auto flex items-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center md:h-8 md:w-8">
        <img src={PolaroidLogo} alt="" />
      </div>
      <h1 className="text-base font-bold md:text-2xl">Polaroid</h1>
    </div>
  );
};

export default Logo;
