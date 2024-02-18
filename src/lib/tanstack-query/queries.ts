import { useMutation } from "@tanstack/react-query";
import { INewUser } from "../types";
import { signUpUser } from "@/api/authApi";

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => signUpUser(user),
  });
};
