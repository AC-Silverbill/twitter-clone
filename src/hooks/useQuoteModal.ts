import { create } from "zustand";

interface QuoteModalStore {
    isOpen: boolean;
    openQuoteModal: () => void;
    closeQuoteModal: () => void;
}

const useQuoteModal = create<QuoteModalStore>((set) => ({
    isOpen: false,
    openQuoteModal: () => set({ isOpen: true }),
    closeQuoteModal: () => set({ isOpen: false }),
}));

export default useQuoteModal;
