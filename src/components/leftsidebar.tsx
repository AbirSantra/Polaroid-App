import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./logo";
import { useUserContext } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, MoreVertical, Settings } from "lucide-react";
import { navLinkItems } from "@/lib/contants";
import { INavLinkItem } from "@/lib/types";
import { Button } from "./ui/button";

const LeftSideBar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const avatarFallback = user.fullName.charAt(0).toUpperCase();
  return (
    <nav className="hidden min-w-[270px] flex-col gap-16 px-8 py-8 md:flex">
      {/* Logo */}
      <Link to={"/"}>
        <Logo />
      </Link>

      {/* Navlinks */}
      <div className="flex flex-col gap-8">
        {navLinkItems.map((LinkItem: INavLinkItem) => {
          const isActive = pathname === LinkItem.url;

          return (
            <NavLink
              to={LinkItem.url}
              className={`group flex gap-4 ${isActive && "font-semibold text-rose-500"}`}
            >
              <LinkItem.icon size={24} />
              <p>{LinkItem.label}</p>
            </NavLink>
          );
        })}
      </div>

      {/* New Post */}
      <Button variant={"primary"}>New Post</Button>

      {/* Account */}
      <div className="mt-auto flex items-center justify-center gap-4">
        <Avatar className="h-12 w-12 border border-gray-300">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-base font-semibold text-rose-500">
            {user.fullName}
          </p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto">
            <MoreVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mb-4 w-48" align="end">
            <DropdownMenuItem className="flex gap-2 p-3 text-sm font-medium text-gray-700">
              <Settings size={20} /> Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 p-3 text-sm font-medium text-gray-700">
              <LogOut size={20} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default LeftSideBar;
