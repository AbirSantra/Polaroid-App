import * as z from "zod";
import SectionHeader from "./section-header";
import { useForm } from "react-hook-form";
import { ChangePasswordValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ChangePassword = () => {
  const form = useForm<z.infer<typeof ChangePasswordValidation>>({
    resolver: zodResolver(ChangePasswordValidation),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof ChangePasswordValidation>) => {
    console.log(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Change Password" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Current Password"
                    type="password"
                    label="Current Password"
                    description="If you have forgotten your current password, click on Forgot Password"
                    className="p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="New Password"
                    type="password"
                    label="New Password"
                    className="p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="text"
                    label="Confirm Password"
                    className="p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              variant={"primary"}
              type="submit"
              className="w-fit text-xs"
              // disabled={isLoadingUpdate}
            >
              {/* {isLoadingUpdate && <Loader />} */}
              Change Password
            </Button>
            <Button
              variant={"ghost"}
              type="submit"
              className="w-fit text-xs"
              // disabled={isLoadingUpdate}
            >
              {/* {isLoadingUpdate && <Loader />} */}
              Forgot Password?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
