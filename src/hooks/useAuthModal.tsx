import { create } from "zustand";

interface AuthModalStore {
    isOpen: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: true,
    openAuthModal: () => set({ isOpen: true }),
    closeAuthModal: () => set({ isOpen: false }),
}));

export default useAuthModal;
