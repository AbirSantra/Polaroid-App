import { useModal } from "@/context/ModalContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ImagePlus, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { PostValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useUserContext } from "@/context/AuthContext";
import { useCreatePost } from "@/lib/tanstack-query/queries";
import { toast } from "sonner";
import { AxiosError } from "axios";

const AddPostModal = () => {
  const { user } = useUserContext();
  const { modalState, closeModal } = useModal();
  const isModalOpen = modalState.isOpen && modalState.type === "NEW-POST";

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      file: undefined,
      content: "",
    },
  });

  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();

  const handleClose = () => {
    if (!isCreatingPost) {
      closeModal();
      form.resetField("content");
      form.resetField("file");
      setImagePreview(undefined);

      if (imageRef.current) {
        imageRef.current.value = "";
      }
    }
  };

  /* Dynamic TextArea */
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const contentValue = form.watch("content");
  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [contentValue]);

  /* Image Upload */
  const imageRef = useRef<HTMLInputElement>(null);
  const image = form.watch("file");
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const clearImage = () => {
    form.resetField("file");
    setImagePreview(undefined);

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const onSubmit = async (value: z.infer<typeof PostValidation>) => {
    try {
      console.log(value);
      const newPost = await createPost({
        content: value.content,
        file: value.file,
      });
      if (newPost.success) {
        toast("Post created!");
        handleClose();
      }
    } catch (error) {
      console.log("Error: ", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex h-dvh flex-col font-poppins sm:max-w-[500px] md:h-fit">
        <DialogHeader>
          <DialogTitle className="">New Post</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={`What's new @${user.username}`}
                      className="h-fit resize-none border-none p-0 text-sm leading-5 md:leading-6"
                      {...field}
                      ref={textAreaRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input
                      id="uploadImage"
                      type="file"
                      accept="image/png, image/jpeg"
                      ref={imageRef}
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          const img = event.target.files[0];
                          field.onChange(img);
                          setImagePreview(URL.createObjectURL(img));
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {image && (
              <div className="relative bg-gray-100">
                <span
                  className="absolute -right-2 -top-2 flex cursor-pointer items-center justify-center rounded-full bg-rose-500 p-1 text-white"
                  onClick={clearImage}
                >
                  <X size={16} />
                </span>
                <img
                  src={imagePreview}
                  alt=""
                  className="aspect-sqaure flex w-full items-center justify-center object-cover"
                />
              </div>
            )}

            <DialogFooter className="mt-auto flex-row">
              <div
                className="mr-auto flex cursor-pointer items-center justify-center text-gray-400 hover:text-gray-500"
                onClick={() => imageRef.current?.click()}
              >
                <ImagePlus size={18} />
              </div>
              <Button
                type="submit"
                variant={"primary"}
                className="w-fit px-4 py-2 font-poppins"
                disabled={isCreatingPost}
              >
                {isCreatingPost ? "Posting..." : "Post"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
