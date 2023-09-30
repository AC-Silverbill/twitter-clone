import React from "react";
import getLocal from "~/utils/getLocal";
import useTweetModal from "~/hooks/useTweetModal";
import useQuoteModal from "~/hooks/useQuoteModal";

import Modal from "./Modal";
import Button from "../Button";
import Message from "../Message";
import MakeTweet from "../MakeTweet";

const QuoteModal = () => {
    const { isOpen, quote, openQuoteModal, closeQuoteModal } = useQuoteModal();
    const _quote = quote!;
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <Modal isOpen={isOpen} onChange={() => closeQuoteModal()}>
            <MakeTweet quote={_quote} />
        </Modal>
    );
};

export default QuoteModal;
