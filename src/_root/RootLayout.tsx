import React from "react";
import { useUserContext } from "@/context/AuthContext";

const RootLayout = () => {
  const { user } = useUserContext();
  return (
    <div>
      <img src={user.avatar} alt="" />
      <p>Name: {user.fullName}</p>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default RootLayout;
