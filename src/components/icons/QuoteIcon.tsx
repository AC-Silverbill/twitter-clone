import React from "react";
import { Tweet } from "~/types";
import { useSession } from "next-auth/react";
import getLocals from "~/utils/getLocals";
import isValidSession from "~/utils/isValidSession";
import useAuthModal from "~/hooks/useAuthModal";
import useQuoteModal from "~/hooks/useQuoteModal";

import Icon from "../Icon";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";

interface QuoteIconProps {
    tweet: Tweet;
}

const QuoteIcon = ({ tweet }: QuoteIconProps) => {
    const { data } = useSession();
    const { openAuthModal, setDetails } = useAuthModal();
    const { openQuoteModal } = useQuoteModal();
    const { COLOR_GREEN, COLOR_GREEN_LIGHTER } = getLocals("colors");

    const onClick = () => {
        if (!isValidSession(data)) {
            setDetails({ profile: tweet.author });
            return openAuthModal("retweet");
        } else {
            return openQuoteModal(tweet);
        }
    };

    return (
        <div className="group flex cursor-pointer" onClick={onClick}>
            <Icon key={"retweet"} className={`hover:bg-${COLOR_GREEN_LIGHTER}`}>
                <HiOutlineArrowPathRoundedSquare className={`transform flex-1 scale-110 group-hover:text-${COLOR_GREEN}`} />
            </Icon>
            <span className={`flex justify-center items-center text-xs group-hover:text-${COLOR_GREEN}`}>{tweet.retweets}</span>
        </div>
    );
};

export default QuoteIcon;
