import { useMutation } from "@tanstack/react-query";
import { IChangePassword, INewUser, ISignInUser, IUpdateUser } from "../types";
import {
  changePassword,
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
