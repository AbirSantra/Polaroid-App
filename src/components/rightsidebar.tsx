import {
  useFollowUser,
  useGetSuggestedUsers,
} from "@/lib/tanstack-query/queries";
import { IUser } from "@/lib/types";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { UserRoundPlusIcon } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

const RightSideBar = () => {
  return (
    <div className="flex h-full w-[270px] flex-col gap-4 p-6">
      <SuggestedUsers />
      <FollowedUsers />
    </div>
  );
};

export default RightSideBar;

export const SuggestedUsers = () => {
  const { data: suggestions, isPending: isSuggestionsLoading } =
    useGetSuggestedUsers();

  return (
    <div className="flex flex-col gap-4 rounded border p-4 text-xs">
      <p className="font-medium">Follow Suggestions</p>

      {isSuggestionsLoading || !suggestions.data.length ? (
        <div className="flex h-full flex-1 flex-col sm:gap-4">
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </div>
      ) : (
        <div className="flex h-full flex-1 flex-col sm:gap-4">
          {suggestions.data.map((user: IUser) => (
            <UserCard user={user} key={user.username} type="SUGGESTED" />
          ))}
        </div>
      )}
    </div>
  );
};

export const FollowedUsers = () => {
  return <div className="rounded border">Suggested Users</div>;
};

export const UserCard = ({
  user,
  type,
}: {
  user: IUser;
  type: "SUGGESTED" | "FOLLOWED";
}) => {
  const { mutateAsync: followUser, isPending: isFollowingUser } =
    useFollowUser();

  const handleFollowUser = async () => {
    try {
      const followResult = await followUser(user._id);
      if (followResult.success) {
        toast(`You are now following ${user.username}`);
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Link to={`/profile/${user._id}`}>
        <Avatar className="h-8 w-8 border border-gray-300">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            {user.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
      <Link to={`/profile/${user._id}`} className="flex flex-col">
        <p className="font-medium">{user.fullName}</p>
        <p className="text-[10px] text-gray-500">@{user.username}</p>
      </Link>
      {type === "SUGGESTED" && (
        <Button
          size={"icon"}
          variant={"ghost"}
          className="ml-auto text-gray-500 hover:text-rose-500"
          onClick={handleFollowUser}
        >
          <UserRoundPlusIcon size={20} />
        </Button>
      )}
    </div>
  );
};

export const UserCardSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8 rounded-full"></Skeleton>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-24"></Skeleton>
        <Skeleton className="h-2 w-20"></Skeleton>
      </div>
    </div>
  );
};
