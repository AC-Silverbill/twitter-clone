import { create } from "zustand";

interface MiniModalStore {
    isOpen: boolean;
    contents?: any;
    position: { x: number; y: number };
    setPosition: ({ x, y }: { x: number; y: number }) => void;
    openMiniModal: (newContents: React.ReactNode) => void;
    closeMiniModal: () => void;
}

const useMiniModal = create<MiniModalStore>((set) => ({
    isOpen: false,
    position: { x: 0, y: 0 },
    setPosition: ({ x, y }: { x: number; y: number }) => {
        set({ position: { x: x, y: y } });
    },
    openMiniModal: (newContents) => {
        set({ contents: newContents });
        set({ isOpen: true });
    },
    closeMiniModal: () => set({ isOpen: false }),
}));

export default useMiniModal;
