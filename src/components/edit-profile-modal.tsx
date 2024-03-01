import { useModal } from "@/context/ModalContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EditProfileModal = () => {
  const { modalState, closeModal } = useModal();
  const isModalOpen = modalState.isOpen && modalState.type === "EDIT-PROFILE";

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">Edit Profile</DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
