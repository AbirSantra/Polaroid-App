import { IPost } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useModal } from "@/context/ModalContext";

const PostCard = ({ postData }: { postData: IPost }) => {
  const createdAt = moment(postData.createdAt).fromNow();

  const { openModal } = useModal();

  return (
    <div className="flex w-full flex-col gap-4 border-t p-4 sm:rounded-sm sm:border">
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVerticalIcon size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mb-4 mt-4 w-48 font-poppins"
          >
            <DropdownMenuItem
              className="flex cursor-pointer gap-2 p-3 text-xs font-semibold text-gray-700"
              asChild
              onClick={() => openModal("EDIT-POST", { post: postData })}
            >
              <span>
                <PencilIcon size={16} /> Edit Post
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 p-3 text-xs font-semibold text-gray-700"
              asChild
              onClick={() => openModal("DELETE-POST", { post: postData })}
            >
              <span>
                <Trash2Icon size={16} /> Delete Post
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Content */}
      <p className="whitespace-pre-wrap text-sm text-gray-800">
        {postData.content}
      </p>
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
