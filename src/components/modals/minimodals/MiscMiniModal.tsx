import React from "react";
import useMiniModal from "~/hooks/useMiniModal";

import MiniModal from "./MiniModal";

const MiscMiniModal = () => {
    const { isOpen, contents, closeMiniModal } = useMiniModal();

    return (
        <MiniModal isOpen={isOpen} onChange={() => closeMiniModal()}>
            {<div className="flex flex-col justify-center items-center gap-2">{contents}</div>}
        </MiniModal>
    );
};

export default MiscMiniModal;
