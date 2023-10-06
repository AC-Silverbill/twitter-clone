import React, { useState } from "react";
import getLocal from "~/utils/getLocal";

import Icon from "../Icon";
import UploadImage from "./UploadFile";
import { FaRegImage } from "react-icons/fa6";
import { AiOutlineGif } from "react-icons/ai";
import { HiListBullet } from "react-icons/hi2";
import { BsEmojiSmile } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";

interface BottomIconsProps {
    useStateAttachments: { attachments: File[]; setAttachments: React.Dispatch<React.SetStateAction<File[]>> };
}

const BottomIcons = ({ useStateAttachments: { attachments, setAttachments } }: BottomIconsProps) => {
    const COLOR_PRIMARY = getLocal("colors", "COLOR_PRIMARY");

    //TODO: make unique verification better
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            const duplicate = attachments.find((a) => a.lastModified === file.lastModified && a.length === file.length);

            if (!duplicate) {
                setAttachments([...attachments, file]);
            }
        }
    };

    return (
        <>
            <UploadImage onChange={(e) => handleImage(e)} />
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
