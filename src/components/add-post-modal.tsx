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

const AddPostModal = () => {
  const { modalState, closeModal } = useModal();
  const isModalOpen = modalState.isOpen && modalState.type === "NEW-POST";
  const handleClose = () => {
    closeModal();
    setDescription("");
    setSanitizedDescription("");
    setImage(null);
    setImagePreview(undefined);

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  /* Dynamic TextArea */
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState<string>("");
  const [sanitizedDescription, setSanitizedDescription] = useState<string>("");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSanitizedDescription(e.target.value);
    setDescription(e.target.value);
  };

  const handleNewLine = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      setDescription((prev) => prev + `<br />`);
    }
  };

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [description]);

  /* Image Upload */
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage(img);

      const previewUrl = URL.createObjectURL(img);
      setImagePreview(previewUrl);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(undefined);

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex h-screen flex-col font-poppins sm:h-fit sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="">New Post</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="What's new?"
            className="h-fit resize-none border-none p-0 text-xs md:text-sm"
            ref={textAreaRef}
            value={sanitizedDescription}
            onChange={handleDescriptionChange}
            onKeyDown={handleNewLine}
          />
        </div>
        <Input
          id="uploadImage"
          type="file"
          accept="image/png, image/jpeg"
          ref={imageRef}
          onChange={onImageChange}
          className="hidden"
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
              className="aspect-square w-full object-cover"
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
          <Button variant={"primary"} className="w-fit px-4 py-2 font-poppins">
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
