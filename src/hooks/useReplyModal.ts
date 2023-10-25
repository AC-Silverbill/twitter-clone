import { create } from "zustand";
import { Tweet } from "~/types";

interface ReplyModalStore {
    isOpen: boolean;
    reply?: Tweet;
    openReplyModal: (reply: Tweet) => void;
    closeReplyModal: () => void;
}

const useReplyModal = create<ReplyModalStore>((set) => ({
    isOpen: false,
    reply: undefined,
    openReplyModal: (reply: Tweet) => set({ isOpen: true, reply: reply }),
    closeReplyModal: () => set({ isOpen: false, reply: undefined }),
}));

export default useReplyModal;
