import React from "react";
import { Tweet } from "~/types";
import getLocals from "~/utils/getLocals";
import useMiniModal from "~/hooks/useMiniModal";
import useQuoteModal from "~/hooks/useQuoteModal";

import Icon from "~/components/Icon";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { TbPencilMinus } from "react-icons/tb";
import { api } from "~/utils/api";

const MiscMiniModal = () => {
    // 2 WAYS TO DO
    // absolute position with js
    // find out how accessible popover is with html/css (better tbh)
    const { isOpen, contents, details, position, closeMiniModal } = useMiniModal();
    const { COLOR_LIGHT_GRAY } = getLocals("colors");
    const { openQuoteModal } = useQuoteModal();
    const repostTRPC = api.tweet.postRetweet.useMutation();

    if (!isOpen) {
        return <></>;
    }

    const handleRepost = () => {
        if (details) {
            repostTRPC.mutate({ retweetReferenceId: details?.id });
        }
    };

    const handleQuote = () => {
        if (details) {
            openQuoteModal(details);
        }
    };

    return (
        <button
            autoFocus
            id="testing-id"
            className="absolute z-10 bg-white border rounded-xl flex flex-col outline-none shadow-md"
            style={{ left: position.x, top: position.y }}
            onBlur={closeMiniModal}
        >
            <div className={`flex justify-start items-center cursor-pointer gap-4 border-b-[1px] p-2 px-4 hover:bg-${COLOR_LIGHT_GRAY}`}>
                <HiOutlineArrowPathRoundedSquare className={`transform scale-150`} />
                <div>Repost</div>
            </div>
            <div
                className={`flex justify-start items-center cursor-pointer gap-4 border-b-[1px] p-2 px-4 hover:bg-${COLOR_LIGHT_GRAY}`}
                onClick={handleQuote}
            >
                <TbPencilMinus className={`transform scale-150`} />
                <div>Quote</div>
            </div>
        </button>
    );
};

export default MiscMiniModal;
