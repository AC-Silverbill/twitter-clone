import { create } from "zustand";

interface ReplyModalStore {
    isOpen: boolean;
    openReplyModal: () => void;
    closeReplyModal: () => void;
}

const useReplyModal = create<ReplyModalStore>((set) => ({
    isOpen: false,
    openReplyModal: () => set({ isOpen: true }),
    closeReplyModal: () => set({ isOpen: false }),
}));

export default useReplyModal;
