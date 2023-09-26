import Image from "next/image";
import React, { useState } from "react";
import useUser from "~/hooks/useUser";
import getLocal from "~/utils/getLocal";
import { BasicComponentWithChildren } from "~/types";

import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { GrImage } from "react-icons/gr";
import { HiListBullet } from "react-icons/hi2";
import { LuCalendarClock } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import Button from "./Button";
import Icon from "./Icon";
import ProgressCircle from "./ProgressCircle";

const MakeTweet = () => {
    //TODO: make this generic to call for the user's Profile (with a getTwittterUser() maybe)
    const { twitterProfile } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const [tweetContent, setTweetContent] = useState("");
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const primaryDisabledColor = getLocal("colors", "COLOR_PRIMARY_DISABLED");

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTweetContent(e.target.value);
    };

    const MaxContentIcon = () => (
        <div role="progressbar" className="progress-bar w-8 h-8 rounded-[50%]">
            <progress value="75" max="100" className="invisible h-0 w-0"></progress>
        </div>
    );

    return (
        <div className="p-4 flex border-b-[1px] border-${borderColor} w-full">
            <div>
                <Image
                    src={`/images/test1.png`}
                    alt={`Profile Picture of ${twitterProfile.name}`}
                    width={40}
                    height={40}
                    className="rounded-full flex flex-initial"
                />
            </div>
            <div className="flex flex-col px-2 w-full">
                <input type="text" placeholder="What is happening?" className="px-2 outline-none" onChange={handleContentChange} />
                <div className="pt-2 flex w-full">
                    <Icon key={"addfile"} onClick={() => {}} className="cursor-pointer">
                        <GrImage className={`group-hover:text-${primaryColor}`} />
                    </Icon>
                    <Icon key={"addgif"} onClick={() => {}} className={`cursor-pointer`}>
                        <div className={`border-2 border-${primaryColor} scale-90`}>
                            <AiOutlineGif className={``} />
                        </div>
                    </Icon>
                    <Icon key={"createpoll"} onClick={() => {}} className={`cursor-pointer`}>
                        <HiListBullet className={``} />
                    </Icon>
                    <Icon key={"addemoji"} onClick={() => {}} className="cursor-pointer">
                        <BsEmojiSmile className={``} />
                    </Icon>
                    <Icon key={"scheduletweet"} onClick={() => {}} className="cursor-pointer">
                        <LuCalendarClock />
                    </Icon>
                    <ProgressCircle percentage={20} />
                    <Button
                        className={`ml-auto bg-${primaryColor} text-white px-4 rounded-3xl text-sm font-bold disabled:bg-${primaryDisabledColor} disabled:cursor-default`}
                        disabled={tweetContent.length === 0}
                    >
                        <span>Post</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MakeTweet;
