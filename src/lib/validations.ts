import * as z from "zod";

export const SignUpValidation = z.object({
  fullName: z
    .string()
    .min(2, { message: "Fullname must be atleast 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ProfileValidation = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be atleast 2 characters." }),
  email: z.string().email(),
  fullName: z
    .string()
    .min(2, { message: "Fullname must be atleast 2 characters." }),
  file: z.custom<File>(),
  bio: z
    .string()
    .max(120, { message: "Bio should not exceed 120 characters." }),
});

export const ChangePasswordValidation = z.object({
  currentPassword: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
  confirmNewPassword: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
});
