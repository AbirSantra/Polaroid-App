import * as z from "zod";
import SectionHeader from "./section-header";
import { useUserContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { ProfileValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Pencil } from "lucide-react";

const EditProfile = () => {
  const { user } = useUserContext();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  /* Avatar Upload */
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const avatarRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (value: z.infer<typeof ProfileValidation>) => {
    console.log(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Edit Profile" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="flex">
                <FormControl>
                  <div className="relative flex flex-col gap-2">
                    <p className="text-sm font-medium">Profile Picture</p>
                    <Input
                      id="uploadImage"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      ref={avatarRef}
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          const img = event.target.files[0];
                          field.onChange(img);
                          setAvatar(URL.createObjectURL(img));
                        }
                      }}
                    />
                    <Avatar className="h-28 w-28 border border-gray-300">
                      <AvatarImage src={avatar} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <span
                      className="absolute bottom-0 right-0 flex cursor-pointer items-center justify-center gap-1 rounded-full border border-gray-300 bg-white p-2 text-sm font-medium"
                      onClick={() => avatarRef.current?.click()}
                    >
                      <Pencil size={16} strokeWidth={3} />
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="shad-form_message" />
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
                    label="Username"
                    description="This is your unique public display name. It can be your real name or a pseudonym."
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Fullname"
                    type="text"
                    label="Full Name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="text"
                    label="Email"
                    description="This email will be used incase you need to reset your password."
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
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Bio"
                    label="Bio"
                    description="Write something about yourself. Max 120 characters."
                    className="resize-none p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"primary"}
            type="submit"
            className="w-fit text-xs"
            // disabled={isLoadingUpdate}
          >
            {/* {isLoadingUpdate && <Loader />} */}
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
