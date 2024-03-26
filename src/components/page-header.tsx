import React from "react";

const PageHeader = ({ title }: { title: string }) => {
  return <h1 className="font-semibold md:text-xl">{title}</h1>;
};

export default PageHeader;
