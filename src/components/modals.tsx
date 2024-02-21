import React, { useEffect, useState } from "react";
import AddPostModal from "./add-post-modal";
import EditProfileModal from "./edit-profile-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AddPostModal />
      <EditProfileModal />
    </>
  );
};
