import { create } from "zustand";
import { authModalHeaders } from "~/utils/constants";

export type authModalHeadersType = keyof typeof authModalHeaders;
interface AuthModalStore {
    isOpen: boolean;
    headerType: authModalHeadersType;
    openAuthModal: (header: authModalHeadersType) => void;
    closeAuthModal: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    headerType: "default",
    openAuthModal: (headerType: authModalHeadersType) => {
        set({ isOpen: true });
        set({ headerType: headerType });
    },

    closeAuthModal: () => set({ isOpen: false }),
}));

export default useAuthModal;
