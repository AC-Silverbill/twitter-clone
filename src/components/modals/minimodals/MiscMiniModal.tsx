import React from "react";
import useMiniModal from "~/hooks/useMiniModal";

const MiscMiniModal = () => {
    // 2 WAYS TO DO
    // absolute position with js
    // find out how accessible popover is with html/css (better tbh)
    const { isOpen, contents, position, closeMiniModal } = useMiniModal();

    if (!isOpen) {
        return <></>;
    }

    return (
        <div className="absolute z-10" style={{ left: position.x }}>
            Hello
        </div>
    );
};

export default MiscMiniModal;
