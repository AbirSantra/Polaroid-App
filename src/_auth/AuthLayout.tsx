import { Outlet, Navigate } from "react-router-dom";

import PolaroidLogo from "../assets/polaroid-logo.png";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 flex-col items-center justify-center">
            <Outlet />
          </section>
          <section className="hidden h-screen w-1/2 flex-col items-center justify-center bg-gray-50 py-32 font-poppins lg:flex">
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
        </>
      )}
    </>
  );
};

export default AuthLayout;
