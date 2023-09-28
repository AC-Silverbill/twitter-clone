import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Tweet } from "~/types";
import getLocals from "~/utils/getLocals";
import isValidSession from "~/utils/isValidSession";
import useMiscModal from "~/hooks/useMiscModal";
import useReplyModal from "~/hooks/useReplyModal";

import Icon from "../Icon";
import { BsFillBarChartFill } from "react-icons/bs";

interface StatsIconProps {
    tweet: Tweet;
}

const StatsIcon = ({ tweet }: StatsIconProps) => {
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
        <div className="group flex">
            <Icon key={"stats"} onClick={onClick} className={`cursor-pointer hover:bg-${COLOR_WHITE_HIGHLIGHTED}`}>
                <BsFillBarChartFill className={`transform flex-1 group-hover:text-${COLOR_PRIMARY}`} />
            </Icon>

            <span className={`flex justify-center items-center text-xs group-hover:text-${COLOR_PRIMARY}`}>{"???"}</span>
        </div>
    );
};

export default StatsIcon;
