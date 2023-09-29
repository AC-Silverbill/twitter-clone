import React from "react";
import { Tweet } from "~/types";
import { useSession } from "next-auth/react";
import getLocal from "~/utils/getLocal";
import isValidSession from "~/utils/isValidSession";
import useAuthModal from "~/hooks/useAuthModal";
import useReplyModal from "~/hooks/useReplyModal";

import Icon from "../Icon";
import { FaRegMessage } from "react-icons/fa6";

interface ReplyIconProps {
    tweet: Tweet;
}

const ReplyIcon = ({ tweet }: ReplyIconProps) => {
    const { data } = useSession();
    const { openAuthModal } = useAuthModal();
    const { openReplyModal } = useReplyModal();
    const COLOR_PRIMARY = getLocal("colors", "COLOR_PRIMARY");

    const onClick = () => {
        if (!isValidSession(data)) {
            return openAuthModal("reply");
        } else {
            return openReplyModal(tweet);
        }
    };

    return (
        <div className="group flex cursor-pointer" onClick={onClick}>
            <Icon key={"reply"}>
                <FaRegMessage className={`transform -scale-x-100 group-hover:text-${COLOR_PRIMARY}`} />
            </Icon>
            <span className={`flex justify-center items-center text-xs group-hover:text-${COLOR_PRIMARY}`}>{tweet.replies}</span>
        </div>
    );
};

export default ReplyIcon;
