import { Button } from "@/components/ui/button";
import { Flame, Heart } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [feedType, setFeedType] = useState<"FOLLOWING" | "TRENDING">(
    "FOLLOWING"
  );

  return (
    <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-scroll p-8">
      {/* Feed Type Toggler */}
      <div className="flex w-full text-base text-gray-500">
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
      <div>Create Post</div>
      {/* Feed */}
      <div className="min-h-[150vh] bg-rose-100">Feed</div>
    </div>
  );
};

export default Home;
