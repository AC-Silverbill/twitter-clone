import React from "react";
import getLocal from "~/utils/getLocal";
import useAuthModal from "~/hooks/useAuthModal";
import useReplyModal from "~/hooks/useReplyModal";

import Icon from "../Icon";
import { FaRegMessage } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import isValidSession from "~/utils/isValidSession";

const ReplyIcon = () => {
    const { data } = useSession();
    const { openAuthModal } = useAuthModal();
    const { openReplyModal } = useReplyModal();
    const COLOR_PRIMARY = getLocal("colors", "COLOR_PRIMARY");

    const onClick = () => {
        if (!isValidSession(data)) {
            return openAuthModal("reply");
        } else {
            return openReplyModal();
        }
    };

    return (
        <Icon key={"reply"} onClick={onClick} className="cursor-pointer">
            <FaRegMessage className={`transform -scale-x-100 group-hover:text-${COLOR_PRIMARY}`} />
        </Icon>
    );
};

export default ReplyIcon;
