import { create } from "zustand";
import { ReferenceTweet } from "~/types";

interface QuoteModalStore {
    isOpen: boolean;
    quote?: ReferenceTweet;
    openQuoteModal: (quote: ReferenceTweet) => void;
    closeQuoteModal: () => void;
}

const useQuoteModal = create<QuoteModalStore>((set) => ({
    isOpen: false,
    quote: undefined,
    openQuoteModal: (quote: ReferenceTweet) => set({ isOpen: true, quote: quote }),
    closeQuoteModal: () => set({ isOpen: false, quote: undefined }),
}));

export default useQuoteModal;
