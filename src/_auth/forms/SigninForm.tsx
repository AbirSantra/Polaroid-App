import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInValidation } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import PolaroidLogo from "@/assets/polaroid-logo.png";
import googleLogo from "@/assets/google-logo.png";
import { Input } from "@/components/ui/input";
import { KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSignInUser } from "@/lib/tanstack-query/queries";
import { toast } from "sonner";
import { useUserContext } from "@/context/AuthContext";
import { AxiosError } from "axios";

const SigninForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInUser, isPending: isSignInPending } =
    useSignInUser();

  const onSubmit = async (user: z.infer<typeof SignInValidation>) => {
    try {
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
        <p className="mb-8 text-3xl font-semibold">Welcome Back</p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
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
            <Button
              variant={"primary"}
              type="submit"
              disabled={isSignInPending}
            >
              {isUserLoading || isSignInPending ? "Loading..." : "Sign In"}
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
          New here?
          <Link to="/sign-up" className="ml-1 text-rose-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SigninForm;
