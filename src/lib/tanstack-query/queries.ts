import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IChangePassword,
  INewPost,
  INewUser,
  ISignInUser,
  IUpdatePost,
  IUpdateUser,
} from "../types";
import {
  changePassword,
  createPost,
  deletePost,
  deleteProfile,
  getAllPost,
  signInUser,
  signOutUser,
  signUpUser,
  updatePost,
  updateUser,
} from "@/api/authApi";

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => signUpUser(user),
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: (user: ISignInUser) => signInUser(user),
  });
};

export const useSignOutUser = () => {
  return useMutation({
    mutationFn: () => signOutUser(),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: IChangePassword) => changePassword(data),
  });
};

export const useDeleteProfile = () => {
  return useMutation({
    mutationFn: () => deleteProfile(),
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["ALL_POSTS"],
    queryFn: () => getAllPost(),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ALL_POSTS"],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ALL_POSTS"],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: { _id: string | undefined }) => deletePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_POSTS"] });
    },
  });
};
