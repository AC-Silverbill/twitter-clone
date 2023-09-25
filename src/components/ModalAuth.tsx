import React from "react";
import useAuthModal, { authModalHeadersType } from "~/hooks/useAuthModal";
import getLocal from "~/utils/getLocal";

import Modal from "./Modal";
import Button from "./Button";
const ModalAuth = () => {
    const { isOpen, headerType, openAuthModal, closeAuthModal } = useAuthModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    const headers: { [name in authModalHeadersType]: React.ReactNode } = {
        default: <>default</>,
        reply: <>reply</>,
        retweet: <>retweet</>,
        like: <>like</>,
        follow: <>follow</>,
    };

    return (
        <Modal isOpen={isOpen} onChange={() => closeAuthModal()}>
            <div className="flex flex-col justify-center items-center gap-2">
                {headers[headerType]}
                <Button className={`w-[300px] p-4 border rounded-3xl font-bold bg-[${primaryColor}] text-white`}>Log in</Button>
                <Button className={`w-[300px] p-4 border rounded-3xl font-bold bg-white text-[${primaryColor}]`}>Sign up</Button>
            </div>
        </Modal>
    );
};

export default ModalAuth;
