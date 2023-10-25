import React, { useRef, useState } from "react";
import { Tweet } from "~/types";
import { useSession } from "next-auth/react";
import useAuthModal from "~/hooks/useAuthModal";
import isValidSession from "~/utils/isValidSession";
import getLocals from "~/utils/getLocals";

import Icon from "../Icon";
import { AiOutlineHeart } from "react-icons/ai";

interface QuoteIconProps {
    tweet: Tweet;
}

const LikeIcon = ({ tweet }: QuoteIconProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const { data } = useSession();
    const { openAuthModal, setDetails } = useAuthModal();
    const { COLOR_PINK, COLOR_PINK_LIGHTER } = getLocals("colors");

    const onClick = () => {
        if (!isValidSession(data)) {
            setDetails({ profile: tweet.author });
            return openAuthModal("like");
        } else {
            setIsLiked(!isLiked);
        }
    };

    return (
        <div className="group flex cursor-pointer" onClick={onClick}>
            <Icon key={"like"} className={`hover:bg-${COLOR_PINK_LIGHTER} ${isLiked && "is-liked"}`}>
                <AiOutlineHeart className={`transform flex-1 group-hover:text-${COLOR_PINK}`} />
            </Icon>
            <span className={`flex justify-center items-center text-xs group-hover:text-${COLOR_PINK}`}>{tweet.likes}</span>
        </div>
    );
};

export default LikeIcon;
