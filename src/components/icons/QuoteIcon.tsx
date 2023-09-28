import React from "react";
import { useSession } from "next-auth/react";
import getLocals from "~/utils/getLocals";
import isValidSession from "~/utils/isValidSession";
import useAuthModal from "~/hooks/useAuthModal";
import useQuoteModal from "~/hooks/useQuoteModal";

import Icon from "../Icon";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

const QuoteIcon = () => {
    const { data } = useSession();
    const { openAuthModal } = useAuthModal();
    const { openQuoteModal } = useQuoteModal();
    const { COLOR_GREEN, COLOR_GREEN_LIGHTER } = getLocals("colors");

    const onClick = () => {
        if (!isValidSession(data)) {
            return openAuthModal("retweet");
        } else {
            return openQuoteModal();
        }
    };

    return (
        <Icon key={"retweet"} onClick={onClick} className={`cursor-pointer hover:bg-${COLOR_GREEN_LIGHTER}`}>
            <HiOutlineArrowPathRoundedSquare className={`transform flex-1 scale-110 group-hover:text-${COLOR_GREEN}`} />
        </Icon>
    );
};

export default QuoteIcon;
