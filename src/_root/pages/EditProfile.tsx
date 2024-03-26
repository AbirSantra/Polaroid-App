import PageHeader from "@/components/page-header";
import React from "react";

const EditProfile = () => {
  return (
    <div className="custom-scrollbar flex flex-1 flex-col gap-8 overflow-scroll p-2 sm:p-4 md:gap-16 md:p-8">
      <PageHeader title="Edit Profile" />
      <div>Content</div>
    </div>
  );
};

export default EditProfile;
