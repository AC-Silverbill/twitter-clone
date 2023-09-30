import React from "react";
import getLocal from "~/utils/getLocal";
import useReplyModal from "~/hooks/useReplyModal";

import Modal from "./Modal";
import Button from "../Button";
import MakeReply from "../MakeReply";

const ReplyModal = () => {
    const { isOpen, reply, openReplyModal, closeReplyModal } = useReplyModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const _reply = reply!;

    return (
        <Modal isOpen={isOpen} onChange={() => closeReplyModal()}>
            <MakeReply tweetReply={_reply} />
        </Modal>
    );
};

export default ReplyModal;
