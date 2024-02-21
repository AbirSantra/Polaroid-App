import { useModal } from "@/context/ModalContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImagePlus } from "lucide-react";

const AddPostModal = () => {
  const { modalState, closeModal } = useModal();
  const isModalOpen = modalState.isOpen && modalState.type === "NEW-POST";

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="font-poppins sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="">New Post</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="What's new?"
            className="max-w-none border-none p-0 text-sm font-light"
          />
        </div>
        <DialogFooter>
          <div className="mr-auto flex cursor-pointer items-center justify-center text-gray-400 hover:text-gray-500">
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
