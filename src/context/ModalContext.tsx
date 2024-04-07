import { IPost } from "@/lib/types";
import React, { createContext, useContext, useState } from "react";

export type ModalType =
  | "NEW-POST"
  | "EDIT-POST"
  | "DELETE-POST"
  | "DELETE-PROFILE";

interface ModalData {
  post?: IPost;
}
interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData | undefined;
}

interface ModalContextProps {
  modalState: ModalStore;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

const initialModalState: ModalStore = {
  type: null,
  isOpen: false,
  data: {},
};

const ModalContext = createContext<ModalContextProps>({
  modalState: initialModalState,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalStore>({
    type: null,
    isOpen: false,
    data: {},
  });

  const openModal = (type: ModalType, data?: ModalData) =>
    setModalState({ isOpen: true, type, data });
  const closeModal = () =>
    setModalState({ type: null, isOpen: false, data: {} });

  const value = {
    modalState,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
