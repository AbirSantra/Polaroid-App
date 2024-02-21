import { Heart, Home, PencilLine, Search, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useModal } from "@/context/ModalContext";

const BottomBar = () => {
  const { openModal } = useModal();

  return (
    <div className="sticky bottom-0 z-50 flex h-16 w-full items-center justify-between border-t px-8 text-gray-700 md:hidden">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <Home size={24} />
      </NavLink>
      <NavLink
        to={"/explore"}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <Search size={24} />
      </NavLink>
      <Button
        variant={"primary"}
        size={"icon"}
        className="rounded-full"
        onClick={() => openModal("NEW-POST")}
      >
        <PencilLine size={24} />
      </Button>
      <NavLink
        to={"/activity"}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <Heart size={24} />
      </NavLink>
      <NavLink
        to={"/profile"}
        className={({ isActive }) =>
          `group flex gap-4 ${isActive && "font-semibold text-rose-500"}`
        }
      >
        <UserRound size={24} />
      </NavLink>
    </div>
  );
};

export default BottomBar;
