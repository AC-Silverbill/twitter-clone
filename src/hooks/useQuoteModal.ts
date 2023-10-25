import { create } from "zustand";
import { Tweet } from "~/types";

interface QuoteModalStore {
    isOpen: boolean;
    quote?: Tweet;
    openQuoteModal: (quote: Tweet) => void;
    closeQuoteModal: () => void;
}

const useQuoteModal = create<QuoteModalStore>((set) => ({
    isOpen: false,
    quote: undefined,
    openQuoteModal: (quote: Tweet) => set({ isOpen: true, quote: quote }),
    closeQuoteModal: () => set({ isOpen: false, quote: undefined }),
}));

export default useQuoteModal;
