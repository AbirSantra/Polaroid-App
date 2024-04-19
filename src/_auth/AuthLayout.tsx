import { Outlet, Navigate } from "react-router-dom";

import PolaroidLogo from "../assets/polaroid-logo.png";
import { useUserContext } from "@/context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) {
    return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-8 p-8 md:p-16">
        {/* Logo */}
        <div className="my-auto flex flex-col items-center gap-16">
          <div className="flex h-16 w-16 animate-spin items-center justify-center">
            <img src={PolaroidLogo} alt="" />
          </div>
          <p className="text-xl font-semibold">Loading...</p>
        </div>
        {/* Tagline */}
        <div className="text-center font-semibold text-gray-500">
          <p>Capture Moments.</p>
          <p>Share Stories.</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="flex h-dvh w-full">
      <section className="hidden h-dvh w-1/2 flex-col items-center justify-center bg-gray-50 py-32 font-poppins md:flex">
        {/* Logo */}
        <div className="my-auto flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center">
            <img src={PolaroidLogo} alt="" />
          </div>
          <h1 className="text-4xl font-bold">Polaroid</h1>
        </div>
        {/* Tagline */}
        <div className="text-center font-semibold text-gray-500">
          <p>Capture Moments.</p>
          <p>Share Stories.</p>
        </div>
      </section>
      <section className="flex h-full flex-1 flex-col items-center justify-center">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
