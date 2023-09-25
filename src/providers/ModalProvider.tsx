import React from "react";
import { useState, useEffect } from "react";
import ModalAuth from "~/components/ModalAuth";

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
            <ModalAuth />
        </>
    );
};

export default ModalProvider;
