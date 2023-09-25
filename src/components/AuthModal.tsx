import React from "react";
import useAuthModal from "~/hooks/useAuthModal";
import Modal from "./Modal";

const AuthModal = () => {
    const { isOpen, openAuthModal, closeAuthModal } = useAuthModal();

    return (
        <Modal title="Sign in" description="test description" isOpen={isOpen} onChange={() => closeAuthModal()}>
            contents
        </Modal>
    );
};

export default AuthModal;
