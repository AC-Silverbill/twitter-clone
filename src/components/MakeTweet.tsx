"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import useUser from "~/hooks/useUser";
import getLocal from "~/utils/getLocal";
import convertMultiToSingleLine from "~/utils/convertMultiToSingleLine";
import { BasicComponentWithChildren } from "~/types";

import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { GrImage } from "react-icons/gr";
import { HiListBullet } from "react-icons/hi2";
import { LuCalendarClock } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import Button from "./Button";
import Icon from "./Icon";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const MakeTweet = () => {
    //TODO: import MaxContent from a global settings list. maybe throw it in constants?
    const maxContent = 300;

    //TODO: make this generic to call for the user's Profile (with a getTwittterUser() maybe)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { twitterProfile } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const [tweetContent, setTweetContent] = useState("");
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const primaryDisabledColor = getLocal("colors", "COLOR_PRIMARY_DISABLED");
    const borderColor = getLocal("colors", "COLOR_BORDER");
    const whiteHighlighted = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED");
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        console.log(textAreaRef.current?.value);
        setTweetContent(textAreaRef.current!.value);
    };

    //####################SECTION#################### MakeTweet only components; created because it will be easier to look at the return values below
    const ProfileImage = () => (
        <div>
            <Image
                src={`/images/test1.png`}
                alt={`Profile Picture of ${twitterProfile.name}`}
                width={40}
                height={40}
                className="rounded-full flex flex-initial"
            />
        </div>
    );

    const AudienceDropdown = () => (
        <div className="px-2 pb-4">
            <Button
                className={`flex border rounded-3xl transition hover:bg-${whiteHighlighted} text-${primaryColor} text-xs font-semibold self-start p-1 px-2`}
            >
                Everyone -
            </Button>
        </div>
    );
    const TweetArea = () => (
        <textarea
            ref={textAreaRef}
            placeholder="What is happening?"
            className={`px-2 outline-none break-words max-h-full block`}
            onChange={handleContentChange}
            onFocus={() => setIsExpanded(true)}
        />
    );
    const WhoCanReply = () => (
        <Button className={`flex px-2 items-center transition hover:bg-${whiteHighlighted} self-start rounded-3xl`}>
            <FaGlobeAmericas size={10} className={`text-${primaryColor}`} />
            <span className={`flex text-${primaryColor} text-xs font-semibold self-start p-1 px-2`}>Everyone can reply</span>
        </Button>
    );

    const BottomIcons = () => (
        <>
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
        </>
    );

    const CircleProgressBar = () => (
        <div className="flex justify-center items-center">
            <CircularProgressbar
                minValue={0}
                maxValue={100}
                value={Math.round((tweetContent.length / maxContent) * 100)}
                className="w-6 h-6"
                strokeWidth={10}
                styles={buildStyles({
                    pathColor: `rgba(62, 152, 199)`,
                    textColor: "#f88",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                })}
            />
        </div>
    );

    const MiddleBar = () => <div className={`self-center w-[1px] h-6 bg-gray-400`}></div>;

    const AddAnotherPost = () => (
        <button className={`flex justify-center items-center w-7 h-7 rounded-full border self-center hover:bg-${whiteHighlighted}`}>
            +
        </button>
    );

    //####################SECTION END####################

    return (
        <div className="p-4 flex border-b-[1px] border-${borderColor} w-full">
            <ProfileImage />
            <div className={`flex flex-col px-2 w-full`}>
                {isExpanded && <AudienceDropdown />}
                <TweetArea />
                {isExpanded && <WhoCanReply />}
                <div className={`${isExpanded && `border-b py-1`}`}></div>
                <div className="pt-2 flex w-full">
                    <BottomIcons />
                    <div className="flex ml-auto gap-2">
                        {tweetContent.length !== 0 && (
                            <>
                                <CircleProgressBar />
                                <MiddleBar />
                                <AddAnotherPost />
                            </>
                        )}
                        <Button
                            className={`bg-${primaryColor} text-white px-5 rounded-3xl text-sm font-bold disabled:bg-${primaryDisabledColor} disabled:cursor-default enabled:hover:translate-x-1 transition`}
                            disabled={tweetContent.length === 0}
                        >
                            <span>Post</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeTweet;
