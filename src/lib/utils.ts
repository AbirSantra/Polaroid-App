import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IPost } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkLikedStatus = ({
  post,
  userId,
}: {
  post: IPost;
  userId: string;
}) => {
  return post.likes.some((like) => like.user === userId);
};

export const checkSavedStatus = ({
  post,
  userId,
}: {
  post: IPost;
  userId: string;
}) => {
  return post.saves.some((save) => save.user === userId);
};
