import { Heart, Home, PencilLine, Search, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useModal } from "@/context/ModalContext";
import { useUserContext } from "@/context/AuthContext";

const BottomBar = () => {
  const { openModal } = useModal();
  const { user } = useUserContext();

  return (
    <div className="flex h-14 w-full items-center justify-between border-t bg-white px-8 text-gray-700">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <Home size={20} />
      </NavLink>
      <NavLink
        to={"/explore"}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <Search size={20} />
      </NavLink>
      <Button
        variant={"primary"}
        size={"icon"}
        className="h-8 w-8 rounded-full"
        onClick={() => openModal("NEW-POST")}
      >
        <PencilLine size={18} />
      </Button>
      <NavLink
        to={"/activity"}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <Heart size={20} />
      </NavLink>
      <NavLink
        to={`/profile/${user._id}`}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <UserRound size={20} />
      </NavLink>
    </div>
  );
};

export default BottomBar;
