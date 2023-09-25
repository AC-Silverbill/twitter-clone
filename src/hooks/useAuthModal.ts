import { create } from "zustand";

//ways you will end up opening the AuthModal
const authModalHeaders = {
    default: "default",
    reply: "reply",
    retweet: "retweet",
    like: "like",
    follow: "follow",
} as const;

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
