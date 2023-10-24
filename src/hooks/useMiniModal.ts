import { create } from "zustand";

interface MiniModalStore {
    isOpen: boolean;
    contents?: any;
    openMiniModal: (newContents: React.ReactNode) => void;
    closeMiniModal: () => void;
}

const useMiniModal = create<MiniModalStore>((set) => ({
    isOpen: false,
    openMiniModal: (newContents) => {
        set({ contents: newContents });
        set({ isOpen: true });
    },
    closeMiniModal: () => set({ isOpen: false }),
}));

export default useMiniModal;
