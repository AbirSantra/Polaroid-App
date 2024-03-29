import { useUserContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LeftSideBar from "@/components/leftsidebar";
import RightSideBar from "@/components/rightsidebar";
import TopBar from "@/components/topbar";
import BottomBar from "@/components/bottombar";

const RootLayout = () => {
  const { isAuthenticated } = useUserContext();

  return isAuthenticated ? (
    <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col md:flex md:flex-row">
      <div className="sticky inset-x-0 top-0 z-50 w-full md:hidden">
        <TopBar />
      </div>

      <div className="sticky inset-y-0 left-0 hidden h-screen border-r md:flex">
        <LeftSideBar />
      </div>

      <section className="h-full flex-1">
        <Outlet />
      </section>

      <div className="sticky inset-y-0 right-0 hidden h-screen border-l lg:flex">
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
