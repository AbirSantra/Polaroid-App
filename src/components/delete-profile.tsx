import React from "react";
import SectionHeader from "./section-header";
import { Button } from "./ui/button";

const DeleteProfile = () => {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Delete Profile" />
      <div className="flex flex-col gap-4 rounded-sm border border-red-500 p-4">
        <p className="text-xs font-medium text-red-500">
          Once you delete your profile, there is no goind back. Please be
          certain.
        </p>
        <Button
          className="w-fit text-xs font-semibold text-red-500"
          variant={"secondary"}
        >
          Delete Profile
        </Button>
      </div>
    </div>
  );
};

export default DeleteProfile;
