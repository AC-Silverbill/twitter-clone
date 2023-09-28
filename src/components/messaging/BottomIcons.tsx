import React from "react";
import getLocal from "~/utils/getLocal";

import Icon from "../Icon";
import { FaRegImage } from "react-icons/fa6";
import { AiOutlineGif } from "react-icons/ai";
import { HiListBullet } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";

const BottomIcons = () => {
    const COLOR_PRIMARY = getLocal("colors", "COLOR_PRIMARY");
    return (
        <>
            <Icon key={"addfile"} onClick={() => {}} className="cursor-pointer">
                <FaRegImage className={`text-${COLOR_PRIMARY} scale-y-125`} />
            </Icon>
            <Icon key={"addgif"} onClick={() => {}} className={`cursor-pointer`}>
                <div className={`border-2 border-${COLOR_PRIMARY} scale-90`}>
                    <AiOutlineGif className={`text-${COLOR_PRIMARY}`} />
                </div>
            </Icon>
            <Icon key={"createpoll"} onClick={() => {}} className={`cursor-pointer`}>
                <HiListBullet className={`text-${COLOR_PRIMARY}`} />
            </Icon>
            <Icon key={"addemoji"} onClick={() => {}} className="cursor-pointer">
                <BsEmojiSmile className={`text-${COLOR_PRIMARY}`} />
            </Icon>
            <Icon key={"scheduletweet"} onClick={() => {}} className="cursor-pointer">
                <LuCalendarClock className={`text-${COLOR_PRIMARY}`} />
            </Icon>
        </>
    );
};

export default BottomIcons;
