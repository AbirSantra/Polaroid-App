import React, { createContext, useContext, useState } from "react";

export type ModalType = "NEW-POST" | "EDIT-PROFILE" | "DELETE-PROFILE";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
}

interface ModalContextProps {
  modalState: ModalStore;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const initialModalState: ModalStore = {
  type: null,
  isOpen: false,
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
  });

  const openModal = (type: ModalType) => setModalState({ isOpen: true, type });
  const closeModal = () => setModalState({ type: null, isOpen: false });

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
