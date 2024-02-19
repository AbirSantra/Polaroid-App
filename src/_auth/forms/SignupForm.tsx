import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SignUpValidation } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtSign, KeyRound, Mail, UserRound } from "lucide-react";
import PolaroidLogo from "@/assets/polaroid-logo.png";
import googleLogo from "@/assets/google-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSignInUser, useSignUpUser } from "@/lib/tanstack-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { AxiosError } from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signUpUser, isPending: isSignUpPending } =
    useSignUpUser();

  const { mutateAsync: signInUser, isPending: isSignInPending } =
    useSignInUser();

  const onSubmit = async (user: z.infer<typeof SignUpValidation>) => {
    try {
      const newUser = await signUpUser(user);
      if (newUser.success) {
        toast("Account created!");
      }

      await signInUser(user);

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        toast("Sign In Successful");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
      console.log("Error: ", error);
    }
  };

  return (
    <Form {...form}>
      <div className="flex w-full max-w-80 flex-col items-center justify-center gap-8">
        <div className="flex h-16 w-16 items-center justify-center md:hidden">
          <img src={PolaroidLogo} alt="" />
        </div>
        <p className="mb-8 text-3xl font-semibold">Join us today</p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Fullname"
                    type="text"
                    icon={<UserRound size={20} />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    type="text"
                    icon={<AtSign size={20} />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="text"
                    icon={<Mail size={20} />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    icon={<KeyRound size={20} />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full space-y-4 pt-4">
            <Button variant={"primary"} type="submit">
              {isSignUpPending || isSignInPending || isUserLoading
                ? "Signing you in..."
                : "Sign Up"}
            </Button>
            <Button variant={"outline"} className="text-gray-500">
              <img
                src={googleLogo}
                alt="Google Logo"
                className="mr-3"
                height={16}
                width={16}
              />
              Continue with Google
            </Button>
          </div>
        </form>
        <p className="text-center text-sm font-medium text-gray-400">
          Have an account?
          <Link to="/sign-in" className="ml-1 text-rose-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignupForm;
