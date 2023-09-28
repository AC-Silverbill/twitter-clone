import React, { useState } from "react";
import getLocals from "~/utils/getLocals";
import useMiscModal from "~/hooks/useMiscModal";
import useReplyModal from "~/hooks/useReplyModal";

import Icon from "../Icon";
import { BsFillBarChartFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import isValidSession from "~/utils/isValidSession";

const StatsIcon = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { data } = useSession();
    const { openMiscModal } = useMiscModal();
    const { openReplyModal } = useReplyModal();
    const { COLOR_PRIMARY, COLOR_WHITE_HIGHLIGHTED } = getLocals("colors");

    const onClick = () => {
        if (!isValidSession(data)) {
            return openMiscModal("stats");
        } else {
            setIsBookmarked(!isBookmarked);
        }
    };

    return (
        <Icon key={"stats"} onClick={onClick} className={`cursor-pointer hover:bg-${COLOR_WHITE_HIGHLIGHTED}`}>
            <BsFillBarChartFill className={`transform flex-1 group-hover:text-${COLOR_PRIMARY}`} />
        </Icon>
    );
};

export default StatsIcon;
