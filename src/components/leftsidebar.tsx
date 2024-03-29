import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, MoreVertical, PencilLine, Settings } from "lucide-react";
import { navLinkItems } from "@/lib/contants";
import { INavLinkItem } from "@/lib/types";
import { Button } from "./ui/button";
import { useSignOutUser } from "@/lib/tanstack-query/queries";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useModal } from "@/context/ModalContext";

const LeftSideBar = () => {
  const { user, setUser, setIsAuthenticated } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const avatarFallback = user.fullName.charAt(0).toUpperCase();
  const { mutate: signOutUser } = useSignOutUser();
  const { openModal } = useModal();

  const handleLogout = async () => {
    try {
      signOutUser();
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/sign-in");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast("Signed Out Successfully!");
      }
      console.log("Error: ", error);
    }
  };

  return (
    <nav className="flex h-full w-20 flex-col items-center gap-16 px-6 py-6 xl:w-[270px] xl:items-start xl:px-8 xl:py-8">
      {/* Logo */}
      <div className="flex xl:hidden">
        <Logo icon />
      </div>
      <div className="hidden xl:flex">
        <Logo />
      </div>

      {/* Navlinks */}
      <div className="flex flex-col gap-12">
        {navLinkItems.map((LinkItem: INavLinkItem) => {
          const isActive = pathname === LinkItem.url;

          return (
            <NavLink
              to={LinkItem.url}
              key={LinkItem.label}
              className={`group flex gap-4 ${isActive && "font-semibold text-rose-500"}`}
            >
              <LinkItem.icon size={24} />
              <p className="hidden xl:flex">{LinkItem.label}</p>
            </NavLink>
          );
        })}
      </div>

      {/* New Post */}
      <Button
        className="hidden xl:flex"
        variant={"primary"}
        onClick={() => openModal("NEW-POST")}
      >
        New Post
      </Button>
      <Button
        variant={"primary"}
        size={"icon"}
        className="rounded-full xl:hidden"
        onClick={() => openModal("NEW-POST")}
      >
        <PencilLine size={24} />
      </Button>

      {/* Account */}

      <div className="mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className=" flex w-full items-center gap-4">
            <Avatar className="h-12 w-12 border border-gray-300">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="hidden flex-col xl:flex">
              <p className="text-base font-semibold text-rose-500">
                {user.fullName}
              </p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
            <MoreVertical size={20} className="hidden xl:flex" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mb-4 ml-4 w-48 font-poppins"
            align="end"
          >
            <DropdownMenuItem
              className="flex gap-2 p-3 text-sm font-medium text-gray-700"
              asChild
            >
              <Link to={"/settings"}>
                <Settings size={20} /> Edit Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 p-3 text-sm font-medium text-gray-700"
              onClick={handleLogout}
            >
              <LogOut size={20} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default LeftSideBar;
