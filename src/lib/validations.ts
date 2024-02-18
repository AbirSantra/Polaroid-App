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
