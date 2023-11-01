import React, { useRef } from "react";
import useMiniModal from "~/hooks/useMiniModal";

import Icon from "~/components/Icon";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { TbPencilMinus } from "react-icons/tb";
import getLocals from "~/utils/getLocals";
import { Random } from "~/utils/Random";

const MiscMiniModal = () => {
    // 2 WAYS TO DO
    // absolute position with js
    // find out how accessible popover is with html/css (better tbh)
    const { isOpen, contents, position, closeMiniModal } = useMiniModal();
    const { COLOR_LIGHT_GRAY } = getLocals("colors");

    const modalID = "repost-mini-modal-" + Random.createRandomString(8);
    const miniModalRef = useRef(null);
    if (!isOpen) {
        return <></>;
    }

    return (
        <button
            autoFocus
            ref={miniModalRef}
            id="testing-id"
            className="absolute z-10 bg-white border rounded-xl flex flex-col outline-none shadow-md"
            style={{ left: position.x, top: position.y }}
            onBlur={closeMiniModal}
        >
            <div className={`flex justify-start items-center cursor-pointer gap-4 border-b-[1px] p-2 px-4 hover:bg-${COLOR_LIGHT_GRAY}`}>
                <HiOutlineArrowPathRoundedSquare className={`transform scale-150`} />
                <div>Repost</div>
            </div>
            <div className={`flex justify-start items-center cursor-pointer gap-4 border-b-[1px] p-2 px-4 hover:bg-${COLOR_LIGHT_GRAY}`}>
                <TbPencilMinus className={`transform scale-150`} />
                <div>Quote</div>
            </div>
        </button>
    );
};

export default MiscMiniModal;
