"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import useUser from "~/hooks/useUser";
import getLocal from "~/utils/getLocal";

import { AiOutlineGif } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { GrImage } from "react-icons/gr";
import { HiListBullet } from "react-icons/hi2";
import { LuCalendarClock } from "react-icons/lu";
import Button from "./Button";
import Icon from "./Icon";
import MakeTweetArea from "./MakeTweetArea";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import getLocals from "~/utils/getLocals";

const MakeTweet = () => {
    //TODO: import MaxContent from a global settings list. maybe throw it in constants?
    const maxContent = 300;

    //TODO: make this generic to call for the user's Profile (with a getTwittterUser() maybe)
    const { twitterProfile } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const [tweetContent, setTweetContent] = useState("");
    const { COLOR_PRIMARY, COLOR_PRIMARY_DISABLED, COLOR_WHITE_HIGHLIGHTED, COLOR_WARNING, COLOR_ERROR } = getLocals("colors");

    //TODO: setTweetContent workingly seemlessly with progressCircle
    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTweetContent(e.currentTarget.textContent ?? "");
    };

    const percentage = Math.round((tweetContent.length / maxContent) * 100);
    const postDisabled = tweetContent.length === 0 || tweetContent.length > maxContent;
    const postWarning = percentage > 95;
    const postExceeded = tweetContent.length > maxContent;
    const postTooMuch = tweetContent.length > maxContent + 10;
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
                className={`flex border rounded-3xl transition hover:bg-${COLOR_WHITE_HIGHLIGHTED} text-${COLOR_PRIMARY} text-xs font-semibold self-start p-1 px-2`}
            >
                Everyone -
            </Button>
        </div>
    );

    const WhoCanReply = () => (
        <Button className={`flex px-2 items-center transition hover:bg-${COLOR_WHITE_HIGHLIGHTED} self-start rounded-3xl`}>
            <FaGlobeAmericas size={10} className={`text-${COLOR_PRIMARY}`} />
            <span className={`flex text-${COLOR_PRIMARY} text-xs font-semibold self-start p-1 px-2`}>Everyone can reply</span>
        </Button>
    );

    const BottomIcons = () => (
        <>
            <Icon key={"addfile"} onClick={() => {}} className="cursor-pointer">
                <GrImage className={`group-hover:text-${COLOR_PRIMARY}`} />
            </Icon>
            <Icon key={"addgif"} onClick={() => {}} className={`cursor-pointer`}>
                <div className={`border-2 border-${COLOR_PRIMARY} scale-90`}>
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
                styles={{
                    text: { fontSize: 40, color: "#f88", textAnchor: "middle", alignmentBaseline: "middle" },
                    path: { stroke: `${!postWarning ? COLOR_PRIMARY : postExceeded ? COLOR_ERROR : COLOR_WARNING}` },
                    trail: { stroke: "#d6d6d6" },
                    background: { fill: "#3e98c7" },
                }}
                text={`${postWarning ? maxContent - tweetContent.length : ""}`}
            />
        </div>
    );

    const MiddleBar = () => <div className={`self-center w-[1px] h-6 bg-gray-400`}></div>;

    const AddAnotherPost = () => (
        <button className={`flex justify-center items-center w-7 h-7 rounded-full border self-center hover:bg-${COLOR_WHITE_HIGHLIGHTED}`}>
            +
        </button>
    );

    //####################SECTION END####################

    return (
        <div className="p-4 flex border-b-[1px] border-${borderColor} w-full">
            <ProfileImage />
            <div className={`flex flex-col px-2 w-full`}>
                {isExpanded && <AudienceDropdown />}
                <MakeTweetArea onChange={(e) => handleContentChange(e)} onFocus={() => setIsExpanded(true)} value={tweetContent} />
                {isExpanded && <WhoCanReply />}
                <div className={`${isExpanded && `border-b py-1`}`}></div>
                <div className="pt-2 flex w-full">
                    <BottomIcons />
                    <div className="flex ml-auto gap-2">
                        {isExpanded && (
                            <>
                                {tweetContent.length !== 0 && (
                                    <>
                                        {!postTooMuch && <CircleProgressBar />}
                                        {postTooMuch && (
                                            <div className="flex justify-center items-center">
                                                <span className={`text-sm text-${COLOR_WARNING}`}>{`-${
                                                    tweetContent.length - maxContent
                                                }`}</span>
                                            </div>
                                        )}
                                        <MiddleBar />
                                        <AddAnotherPost />
                                    </>
                                )}
                            </>
                        )}
                        <Button
                            className={`bg-${COLOR_PRIMARY} text-white px-5 rounded-3xl text-sm font-bold disabled:bg-${COLOR_PRIMARY_DISABLED} disabled:cursor-default enabled:hover:translate-x-1 transition`}
                            disabled={postDisabled}
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
