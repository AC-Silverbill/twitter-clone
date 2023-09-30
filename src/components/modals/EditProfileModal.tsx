import React from "react";
import getLocal from "~/utils/getLocal";
import useEditProfileModal from "~/hooks/useEditProfileModal";

import Modal from "./Modal";
import Button from "../Button";
import Message from "../Message";
import MakeTweet from "../MakeTweet";

const EditProfileModal = () => {
    const { isOpen, openEditProfileModal, closeEditProfileModal } = useEditProfileModal();

    return (
        <Modal isOpen={isOpen} onChange={() => closeEditProfileModal()}>
            hi
        </Modal>
    );
};

export default EditProfileModal;
