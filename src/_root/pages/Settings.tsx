import ChangePassword from "@/components/change-password";
import DeleteProfile from "@/components/delete-profile";
import EditProfile from "@/components/edit-profile";
import PageHeader from "@/components/page-header";
import { useUserContext } from "@/context/AuthContext";
import React from "react";

const Settings = () => {
  return (
    <div className="custom-scrollbar flex flex-1 flex-col gap-8 overflow-scroll p-2 sm:p-4 md:gap-16 md:p-8">
      <PageHeader title="Settings" />
      <div className="flex flex-col gap-8 md:gap-12">
        <EditProfile />
        <ChangePassword />
        <DeleteProfile />
      </div>
    </div>
  );
};

export default Settings;
