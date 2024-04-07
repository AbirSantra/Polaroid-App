import { useModal } from "@/context/ModalContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useDeletePost } from "@/lib/tanstack-query/queries";

const DeletePostModal = () => {
  const { modalState, closeModal } = useModal();
  const isModalOpen = modalState.isOpen && modalState.type === "DELETE-POST";
  const postData = modalState.data?.post;

  const handleClose = () => {
    if (!isDeletingPost) {
      closeModal();
    }
  };

  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeletePost();

  const onSubmit = async () => {
    try {
      const deletedPost = await deletePost({
        _id: postData?._id,
      });
      if (deletedPost.success) {
        toast("Post deleted!");
        handleClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message);
      }
      console.log("Error: ", error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="flex flex-col gap-8 font-poppins sm:max-w-md">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete your post and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-auto flex-row">
          <DialogClose asChild>
            <Button variant={"outline"} className="px-4 py-2">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"primary"}
            className="px-4 py-2"
            disabled={isDeletingPost}
            onClick={onSubmit}
          >
            {isDeletingPost ? `Deleting...` : "Delete Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostModal;
