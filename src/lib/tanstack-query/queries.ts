import { useMutation } from "@tanstack/react-query";
import { INewUser, ISignInUser } from "../types";
import { signInUser, signUpUser } from "@/api/authApi";

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
