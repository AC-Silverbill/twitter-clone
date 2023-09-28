import React from "react";
import useTweetModal from "~/hooks/useTweetModal";
import getLocal from "~/utils/getLocal";

import Button from "../Button";
import Modal from "./Modal";
import MakeTweet from "../MakeTweet";

const QuoteModal = () => {
    const { isOpen, openTweetModal, closeTweetModal } = useTweetModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <Modal isOpen={isOpen} onChange={() => closeTweetModal()}>
            <MakeTweet quote={<div>this is a quote</div>} />
        </Modal>
    );
};

export default QuoteModal;
