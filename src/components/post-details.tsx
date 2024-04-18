import * as z from "zod";
import { useUserContext } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import {
  useCommentPost,
  useLikePost,
  useSavePost,
} from "@/lib/tanstack-query/queries";
import { IPost } from "@/lib/types";
import { checkLikedStatus, checkSavedStatus } from "@/lib/utils";
import { AxiosError } from "axios";
import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreVerticalIcon,
  PencilIcon,
  SendHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { CommentValidation } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const PostDetails = ({ postData }: { postData: IPost }) => {
  const { user } = useUserContext();

  const createdAt = moment(postData?.createdAt).fromNow();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      content: "",
    },
  });

  const { openModal } = useModal();

  const isPostOwner = user._id === postData?.user._id;

  const [likesCount, setLikesCount] = useState<number>(postData?.likesCount);

  const [isLiked, setIsLiked] = useState<boolean>(
    checkLikedStatus({ post: postData, userId: user._id })
  );

  const { mutateAsync: likePost } = useLikePost();

  const handleLikePost = async () => {
    try {
      if (isLiked) {
        setLikesCount((prev) => prev - 1);
        setIsLiked((prev) => !prev);
        const likeResult = await likePost(postData?._id);
        if (likeResult.success) {
          toast("Post unliked!");
        }
      } else {
        setLikesCount((prev) => prev + 1);
        setIsLiked((prev) => !prev);
        const likeResult = await likePost(postData?._id);
        if (likeResult.success) {
          toast("Post liked!");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  };

  const [commentsCount, setCommentsCount] = useState<number>(
    postData?.commentsCount
  );

  const { mutateAsync: commentPost } = useCommentPost();

  const handleCommentPost = async (
    values: z.infer<typeof CommentValidation>
  ) => {
    try {
      const commentResult = await commentPost({
        postId: postData?._id,
        content: values.content,
      });
      if (commentResult.success) {
        form.reset();
        setCommentsCount((prev) => prev + 1);
        toast("Added comment!");
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  };

  const [isSaved, setIsSaved] = useState<boolean>(
    checkSavedStatus({ post: postData, userId: user._id })
  );

  const { mutateAsync: savePost } = useSavePost();

  const handleSavePost = async () => {
    try {
      if (isSaved) {
        setIsSaved((prev) => !prev);
        const saveResult = await savePost(postData?._id);
        if (saveResult.success) {
          toast("Post removed from your saves!");
        }
      } else {
        setIsSaved((prev) => !prev);
        const saveResult = await savePost(postData?._id);
        if (saveResult.success) {
          toast("Added post to your saves!");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* User Header */}
      <div className="flex w-full items-center gap-4">
        <Avatar className="h-12 w-12 border border-gray-300">
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
        {isPostOwner && (
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
        )}
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
      <div className="flex w-full items-center gap-8 text-gray-500">
        <span
          className={`flex cursor-pointer items-center justify-center gap-2 ${isLiked && "text-rose-500"} duration-200 ease-in hover:text-rose-500`}
          onClick={handleLikePost}
        >
          {isLiked ? (
            <HeartIcon size={20} fill="#f43f5e" />
          ) : (
            <HeartIcon size={20} />
          )}
          <p className="text-sm font-medium">{likesCount}</p>
        </span>
        <span className="flex cursor-pointer items-center justify-center gap-2">
          <MessageCircleIcon size={20} />
          <p className="text-sm font-medium">{commentsCount}</p>
        </span>
        <span
          className={`ml-auto flex cursor-pointer items-center justify-center gap-2 ${isSaved && "text-rose-500"} duration-200 ease-in hover:text-rose-500`}
          onClick={handleSavePost}
        >
          {isSaved ? (
            <BookmarkIcon size={20} fill="#f43f5e" />
          ) : (
            <BookmarkIcon size={20} />
          )}
        </span>
      </div>
      {/* Comment Box */}
      <Form {...form}>
        <div className="flex w-full items-center gap-4">
          <Avatar className="h-8 w-8 border border-gray-300">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <form
            onSubmit={form.handleSubmit(handleCommentPost)}
            className="w-full"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Add a comment"
                      className="rounded-md border-gray-100 p-2 font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <Button
            className="bg-transparent p-0 hover:bg-transparent hover:text-rose-500"
            type="submit"
          >
            <SendHorizontalIcon size={16} className="text-gray-500" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PostDetails;

export const PostDetailsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* User Header */}
      <div className="flex w-full items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
        <Skeleton className="h-[14px] w-32 text-sm"></Skeleton>
        <Skeleton className="ml-auto h-[10px] w-20"></Skeleton>
      </div>

      {/* Content */}
      <Skeleton className="h-[14px] w-48 text-sm"></Skeleton>

      {/* Image */}
      <Skeleton className="w- flex aspect-video items-center justify-center overflow-hidden rounded-md"></Skeleton>

      {/* Buttons */}
      <div className="flex w-full items-center gap-4">
        <Skeleton className="flex h-[20px] w-32 items-center justify-center gap-2"></Skeleton>
        <Skeleton className="ml-auto flex h-[20px] w-5 items-center justify-center gap-2"></Skeleton>
      </div>
    </div>
  );
};
