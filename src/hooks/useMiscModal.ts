import { create } from "zustand";

//ways you will end up opening the MiscModal
const miscModalHeaders = {
    default: "default",
    stats: "stats",
} as const;

export type miscModalHeadersType = keyof typeof miscModalHeaders;
interface MiscModalStore {
    isOpen: boolean;
    headerType: miscModalHeadersType;
    openMiscModal: (header: miscModalHeadersType) => void;
    closeMiscModal: () => void;
}

const useMiscModal = create<MiscModalStore>((set) => ({
    isOpen: false,
    headerType: "default",
    openMiscModal: (headerType: miscModalHeadersType) => {
        set({ isOpen: true });
        set({ headerType: headerType });
    },

    closeMiscModal: () => set({ isOpen: false }),
}));

export default useMiscModal;
