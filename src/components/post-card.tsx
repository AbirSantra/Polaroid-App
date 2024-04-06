import { IPost } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { BookmarkIcon, HeartIcon, MessageCircleIcon } from "lucide-react";

const PostCard = ({ postData }: { postData: IPost }) => {
  const createdAt = moment(postData.createdAt).fromNow();

  return (
    <div className="flex w-full flex-col gap-4 rounded-sm border p-4">
      {/* User Header */}
      <div className="flex w-full items-center gap-4">
        <Avatar className="h-8 w-8 border border-gray-300">
          <AvatarImage src={postData.user.avatar} />
          <AvatarFallback>
            {postData.user.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold text-gray-900">
          {postData.user.username}
        </p>
        <p className="ml-auto text-[10px] font-semibold text-gray-500">
          {createdAt}
        </p>
      </div>
      {/* Content */}
      <p className="text-sm text-gray-800">{postData.content}</p>
      {/* Image */}
      {postData.imageUrl ? (
        <div className="flex w-full items-center justify-center overflow-hidden rounded-md border border-gray-300">
          <img
            src={postData.imageUrl}
            alt={postData.imageId}
            className="w-full"
          />
        </div>
      ) : null}
      {/* Buttons */}
      <div className="flex w-full items-center gap-4 text-gray-500">
        <span className="flex items-center justify-center gap-2">
          <HeartIcon size={20} />
          <p className="text-sm font-medium">69</p>
        </span>
        <span className="flex items-center justify-center gap-2">
          <MessageCircleIcon size={20} />
          <p className="text-sm font-medium">69</p>
        </span>
        <span className="ml-auto flex items-center justify-center gap-2">
          <BookmarkIcon size={20} />
        </span>
      </div>
      {/* Comment Box */}
    </div>
  );
};

export default PostCard;
