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
import { Input } from "./ui/input";
import { AtSign } from "lucide-react";
import React, { useState } from "react";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useDeleteProfile } from "@/lib/tanstack-query/queries";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DeleteProfileModal = () => {
  const { user, setUser, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const { modalState, closeModal } = useModal();
  const isModalOpen = modalState.isOpen && modalState.type === "DELETE-PROFILE";
  const handleClose = () => {
    closeModal();
  };

  const [usernameCheck, setUsernameCheck] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user.username === e.target.value) {
      setUsernameCheck(true);
    } else {
      setUsernameCheck(false);
    }
  };

  const { mutateAsync: deleteProfile, isPending: isProfileDeleting } =
    useDeleteProfile();

  const onSubmit = async () => {
    try {
      if (!usernameCheck) {
        return;
      }

      const deleteProfileResult = await deleteProfile();
      if (deleteProfileResult.success) {
        handleClose();
        toast(
          `Profile "${deleteProfileResult.data.username}" deleted successfully!`
        );
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/sign-up");
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
            This will permanently delete your profile and remove your data from
            our servers.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Enter your username"
          icon={<AtSign size={20} />}
          type="text"
          description="Enter your username to confirm you want to delete this profile"
          onChange={handleInputChange}
        />
        <DialogFooter className="mt-auto flex-row">
          <DialogClose asChild>
            <Button variant={"outline"} className="px-4 py-2">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={"primary"}
            className="px-4 py-2"
            disabled={!usernameCheck || isProfileDeleting}
            onClick={onSubmit}
          >
            {isProfileDeleting ? "Deleting..." : "Delete Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfileModal;
