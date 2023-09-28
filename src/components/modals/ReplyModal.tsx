import React from "react";
import getLocal from "~/utils/getLocal";
import useReplyModal from "~/hooks/useReplyModal";

import Modal from "./Modal";
import Button from "../Button";
import MakeReply from "../MakeReply";

const ReplyModal = () => {
    const { isOpen, openReplyModal, closeReplyModal } = useReplyModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    if (!isOpen) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onChange={() => closeReplyModal()}>
            <MakeReply />
        </Modal>
    );
};

export default ReplyModal;
