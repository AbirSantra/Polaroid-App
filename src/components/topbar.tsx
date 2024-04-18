import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import Logo from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { useSignOutUser } from "@/lib/tanstack-query/queries";
import { AxiosError } from "axios";
import { toast } from "sonner";

const TopBar = () => {
  const { user, setUser, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const avatarFallback = user.fullName.charAt(0).toUpperCase();
  const { mutate: signOutUser } = useSignOutUser();

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
    <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      <Logo />
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <Avatar className="h-8 w-8 border border-gray-300">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mb-4 w-36 font-poppins" align="end">
          <DropdownMenuItem
            className="flex gap-2 p-3 text-xs font-medium text-gray-700"
            asChild
          >
            <Link to={"/settings"}>
              <Settings size={20} /> Edit Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 p-3 text-xs font-medium text-gray-700"
            onClick={handleLogout}
          >
            <LogOut size={16} /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TopBar;
