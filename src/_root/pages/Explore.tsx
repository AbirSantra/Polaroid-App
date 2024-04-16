import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/useDebounce";
import { useFollowUser, useGetSearchUsers } from "@/lib/tanstack-query/queries";
import { IUser } from "@/lib/types";
import { AxiosError } from "axios";
import { UserRoundPlusIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: users, isPending: isUsersLoading } =
    useGetSearchUsers(debouncedSearch);

  return (
    <div className="flex h-full min-h-screen flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Input
        isSearch={true}
        placeholder="Search Polaroid users"
        className="border-gray-200 p-2"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <div className="flex flex-col gap-4">
        {isUsersLoading ? (
          <div className="flex h-full flex-1 flex-col sm:gap-4">
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        ) : (
          <div className="flex h-full flex-1 flex-col gap-4">
            {!users.data.length ? (
              <p className="text-center text-sm">
                No users matching users found!
              </p>
            ) : (
              users.data.map((user: IUser) => (
                <UserCard user={user} key={user.username} />
              ))
            )}
            {}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

export const UserCard = ({ user }: { user: IUser }) => {
  return (
    <Link
      to={`/profile/${user._id}`}
      className="flex items-center gap-3 rounded-md border border-gray-200 p-4"
    >
      <Avatar className="h-10 w-10 border border-gray-300">
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="font-medium">{user.fullName}</p>
        <p className="text-[10px] text-gray-500">@{user.username}</p>
      </div>
    </Link>
  );
};

export const UserCardSkeleton = () => {
  return (
    <div className="flex items-center gap-3 rounded-md border border-gray-200 p-4">
      <Skeleton className="h-10 w-10 rounded-full"></Skeleton>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-24"></Skeleton>
        <Skeleton className="h-2 w-20"></Skeleton>
      </div>
    </div>
  );
};
