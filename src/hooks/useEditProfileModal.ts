import { create } from "zustand";

interface EditProfileModalStore {
    isOpen: boolean;
    openEditProfileModal: () => void;
    closeEditProfileModal: () => void;
}

const useEditProfileModal = create<EditProfileModalStore>((set) => ({
    isOpen: false,
    openEditProfileModal: () => set({ isOpen: true }),
    closeEditProfileModal: () => set({ isOpen: false }),
}));

export default useEditProfileModal;
