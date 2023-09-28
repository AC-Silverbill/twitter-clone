import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import isValidSession from "~/utils/isValidSession";
import getLocals from "~/utils/getLocals";
import useAuthModal from "~/hooks/useAuthModal";

import Icon from "../Icon";
import { AiOutlineHeart } from "react-icons/ai";

const LikeIcon = () => {
    const [isLiked, setIsLiked] = useState(false);
    const { data } = useSession();
    const { openAuthModal } = useAuthModal();
    const { COLOR_PINK, COLOR_PINK_LIGHTER } = getLocals("colors");

    const onClick = () => {
        if (!isValidSession(data)) {
            return openAuthModal("like");
        } else {
            setIsLiked(!isLiked);
        }
    };

    return (
        <Icon key={"like"} onClick={onClick} className={`cursor-pointer hover:bg-${COLOR_PINK_LIGHTER} ${isLiked && "is-liked"}`}>
            <AiOutlineHeart className={`transform flex-1 group-hover:text-${COLOR_PINK}`} />
        </Icon>
    );
};

export default LikeIcon;
