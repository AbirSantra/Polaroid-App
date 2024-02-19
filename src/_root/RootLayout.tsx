import React from "react";
import { useUserContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const RootLayout = () => {
  const { user, isAuthenticated } = useUserContext();
  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/sign-in" />
      ) : (
        <div>
          <img src={user.avatar} alt="" />
          <p>Name: {user.fullName}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
    </>
  );
};

export default RootLayout;
