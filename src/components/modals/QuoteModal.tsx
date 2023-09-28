import React from "react";
import getLocal from "~/utils/getLocal";
import useTweetModal from "~/hooks/useTweetModal";
import useQuoteModal from "~/hooks/useQuoteModal";

import Button from "../Button";
import Modal from "./Modal";
import MakeTweet from "../MakeTweet";

const QuoteModal = () => {
    const { isOpen, openQuoteModal, closeQuoteModal } = useQuoteModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <Modal isOpen={isOpen} onChange={() => closeQuoteModal()}>
            <MakeTweet quote={<div className="flex justify-center">this is a quote</div>} />
        </Modal>
    );
};

export default QuoteModal;
