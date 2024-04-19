import { useUserContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LeftSideBar from "@/components/leftsidebar";
import RightSideBar from "@/components/rightsidebar";
import TopBar from "@/components/topbar";
import BottomBar from "@/components/bottombar";
import PolaroidLogo from "../assets/polaroid-logo.png";

const RootLayout = () => {
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
    <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col md:flex md:flex-row">
      <div className="sticky inset-x-0 top-0 z-50 w-full md:hidden">
        <TopBar />
      </div>

      <div className="sticky inset-y-0 left-0 hidden h-dvh border-r md:flex">
        <LeftSideBar />
      </div>

      <section className="min-h-dvh flex-1">
        <Outlet />
      </section>

      <div className="sticky inset-y-0 right-0 hidden h-dvh border-l min-[900px]:flex">
        <RightSideBar />
      </div>

      <div className="sticky inset-x-0 bottom-0 z-50 w-full md:hidden">
        <BottomBar />
      </div>
    </div>
  ) : (
    <Navigate to={"/sign-in"} />
  );
};

export default RootLayout;
