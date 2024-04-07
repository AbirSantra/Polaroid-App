import React, { useEffect, useState } from "react";
import AddPostModal from "./add-post-modal";
import EditPostModal from "./edit-post-modal";
import DeleteProfileModal from "./delete-profile-modal";
import DeletePostModal from "./delete-post-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AddPostModal />
      <EditPostModal />
      <DeletePostModal />
      <DeleteProfileModal />
    </>
  );
};
