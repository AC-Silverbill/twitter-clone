import React from "react";
import { useState, useEffect } from "react";
import AuthModal from "~/components/modals/AuthModal";
import MiscModal from "~/components/modals/MiscModal";
import ReplyModal from "~/components/modals/ReplyModal";
import QuoteModal from "~/components/modals/QuoteModal";
import TweetModal from "~/components/modals/TweetModal";

const ModalProvider = () => {
    const [mountedOnce, setMountedOnce] = useState(false);
    useEffect(() => {
        setMountedOnce(true);
    }, []);

    if (!mountedOnce) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <TweetModal />
            <QuoteModal />
            <ReplyModal />
            <MiscModal />
        </>
    );
};

export default ModalProvider;
