import { create } from "zustand";
import { Profile } from "~/types";
import { authModalHeaders } from "~/utils/constants";

export type authModalHeadersType = keyof typeof authModalHeaders;

type AuthModalDetails = { profile: Profile };
interface AuthModalStore {
    isOpen: boolean;
    details?: AuthModalDetails;
    headerType: authModalHeadersType;
    openAuthModal: (header: authModalHeadersType) => void;
    closeAuthModal: () => void;
    setDetails: (newDetails: AuthModalDetails) => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    headerType: "default",
    openAuthModal: (headerType: authModalHeadersType) => {
        set({ isOpen: true });
        set({ headerType: headerType });
    },
    closeAuthModal: () => set({ isOpen: false }),
    setDetails: (newDetails: AuthModalDetails) => set({ details: newDetails }),
}));

export default useAuthModal;
