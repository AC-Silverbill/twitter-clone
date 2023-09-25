import React from "react";
import { useState, useEffect } from "react";
import AuthModal from "~/components/AuthModal";

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
        </>
    );
};

export default ModalProvider;
