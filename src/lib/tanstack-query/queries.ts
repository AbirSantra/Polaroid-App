import { useMutation } from "@tanstack/react-query";
import {
  IChangePassword,
  INewPost,
  INewUser,
  ISignInUser,
  IUpdateUser,
} from "../types";
import {
  changePassword,
  createPost,
  deleteProfile,
  signInUser,
  signOutUser,
  signUpUser,
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

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
  });
};
