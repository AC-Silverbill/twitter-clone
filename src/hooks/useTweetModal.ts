import { create } from "zustand";

interface TweetModalStore {
    isOpen: boolean;
    openTweetModal: () => void;
    closeTweetModal: () => void;
}

const useTweetModal = create<TweetModalStore>((set) => ({
    isOpen: false,
    openTweetModal: () => set({ isOpen: true }),
    closeTweetModal: () => set({ isOpen: false }),
}));

export default useTweetModal;
