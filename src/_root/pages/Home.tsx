import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { Flame, Heart } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [feedType, setFeedType] = useState<"FOLLOWING" | "TRENDING">(
    "FOLLOWING"
  );

  const { user } = useUserContext();
  const avatarFallback = user.fullName.charAt(0).toUpperCase();

  const { openModal } = useModal();

  return (
    <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-scroll p-8">
      {/* Feed Type Toggler */}
      <div className="mb-4 flex w-full text-base text-gray-500">
        <Button
          variant={"ghost"}
          className={`flex flex-1 items-center justify-center gap-2 hover:bg-transparent hover:text-rose-500 ${feedType === "FOLLOWING" && "font-semibold text-rose-500"}`}
          onClick={() => setFeedType("FOLLOWING")}
        >
          <Heart size={18} />
          Following
        </Button>
        <Button
          variant={"ghost"}
          className={`flex flex-1 items-center justify-center gap-2 hover:bg-transparent hover:text-rose-500 ${feedType === "TRENDING" && "font-semibold text-rose-500"}`}
          onClick={() => setFeedType("TRENDING")}
        >
          <Flame size={18} />
          Trending
        </Button>
      </div>

      {/* Create Post */}
      <div
        className="hidden w-full items-center justify-center gap-4 rounded-md border p-4 md:flex"
        onClick={() => openModal("NEW-POST")}
      >
        <Avatar className="h-12 w-12 border border-gray-300">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <p className="w-full cursor-text text-sm font-medium text-gray-500">
          What's new?
        </p>
        <Button variant={"primary"} className="ml-auto w-fit px-4 py-2">
          Post
        </Button>
      </div>

      {/* Feed */}
      <div className="p min-h-[150vh] rounded-md border">Feed</div>
    </div>
  );
};

export default Home;
