import { useUserContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LeftSideBar from "@/components/leftsidebar";
import RightSideBar from "@/components/rightsidebar";
import TopBar from "@/components/topbar";
import BottomBar from "@/components/bottombar";

const RootLayout = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/sign-in" />
      ) : (
        <div className="mx-auto w-full max-w-[1200px] md:flex">
          <TopBar />
          <LeftSideBar />

          <section className="flex h-full flex-1 border-l border-r">
            <Outlet />
          </section>

          <RightSideBar />
          <BottomBar />
        </div>
      )}
    </>
  );
};

export default RootLayout;
