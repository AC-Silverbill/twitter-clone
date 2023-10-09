import React, { useState } from "react";
import { UploadFileResponse } from "uploadthing/client";
import getLocal from "~/utils/getLocal";

import Icon from "../Icon";
import UploadImage from "./UploadFile";
import { FaRegImage } from "react-icons/fa6";
import { AiOutlineGif } from "react-icons/ai";
import { HiListBullet } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";

interface BottomIconsProps {
    useStateAttachments: { attachments: string[]; setAttachments: React.Dispatch<React.SetStateAction<string[]>> };
}

const BottomIcons = ({ useStateAttachments: { attachments, setAttachments } }: BottomIconsProps) => {
    const COLOR_PRIMARY = getLocal("colors", "COLOR_PRIMARY");

    const handleUpload = (newFile: UploadFileResponse) => {
        setAttachments([...attachments, newFile.url]);
    };

    //TODO: add dynamic sizes for images
    return (
        <>
            <UploadImage afterUploadCallback={handleUpload} />

            <Icon key={"addgif"} onClick={() => {}} className={``}>
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
