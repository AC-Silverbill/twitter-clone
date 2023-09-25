import React from "react";
import useTweetModal from "~/hooks/useTweetModal";
import getLocal from "~/utils/getLocal";

import Button from "./Button";
import Modal from "./Modal";

const ModalTweet = () => {
    const { isOpen, openTweetModal, closeTweetModal } = useTweetModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    return (
        <Modal isOpen={isOpen} onChange={() => closeTweetModal()}>
            <Button className={`rounded-lg bg-[${primaryColor}] text-white`}></Button>
        </Modal>
    );
};

export default ModalTweet;
