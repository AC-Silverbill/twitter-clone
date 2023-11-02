import { create } from "zustand";
import { Tweet } from "~/types";

interface MiniModalStore {
    isOpen: boolean;
    contents?: any;
    details?: Tweet;
    position: { x: number; y: number };
    setDetails: (details: Tweet) => void;
    setPosition: ({ x, y }: { x: number; y: number }) => void;
    openMiniModal: (newContents: React.ReactNode) => void;
    closeMiniModal: () => void;
}

const useMiniModal = create<MiniModalStore>((set) => ({
    isOpen: false,
    position: { x: 0, y: 0 },
    setDetails: (details) => {
        set({ details: details });
    },
    setPosition: ({ x, y }: { x: number; y: number }) => {
        set({ position: { x: x, y: y } });
    },
    openMiniModal: (newContents) => {
        set({ contents: newContents });
        set({ isOpen: true });
    },
    closeMiniModal: () => {
        console.log("im closing");
        set({ isOpen: false });
    },
}));

export default useMiniModal;
