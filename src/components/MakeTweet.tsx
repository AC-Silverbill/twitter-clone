"use client";

import React, { useRef, useState } from "react";
import useUser from "~/hooks/useUser";

import MakeTweetArea from "./MakeTweetArea";
import getLocals from "~/utils/getLocals";
import BottomIcons from "./messaging/BottomIcons";
import ProfileImage from "./messaging/ProfileImage";
import CircleProgressBar from "./messaging/CircleProgressBar";
import PostMessage from "./messaging/PostMessage";
import WhoCanReply from "./messaging/WhoCanReply";
import MiddleBar from "./MiddleBar";
import AddAnotherPost from "./messaging/AddAnotherPost";
import AudienceDropdown from "./messaging/AudienceDropdown";
import { api } from "~/utils/api";

interface MakeTweetProps {
    quote?: React.ReactNode;
    defaultExpanded?: boolean;
}

const MakeTweet = ({ quote, defaultExpanded = false }: MakeTweetProps) => {
    const { twitterProfile } = useUser();
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [tweetContent, setTweetContent] = useState("");
    const { COLOR_ERROR } = getLocals("colors");
    //TODO: import MaxContent from a global settings list. maybe throw it in constants?
    const maxContent = 400;
    const percentage = Math.round((tweetContent.length / maxContent) * 100);
    const postDisabled = tweetContent.length === 0 || tweetContent.length > maxContent;
    const postWarning = percentage > 95;
    const postExceeded = tweetContent.length > maxContent;
    const postTooMuch = tweetContent.length > maxContent + 10;

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTweetContent(e.currentTarget.textContent ?? "");
    };

    const tweetMutation = api.tweet.postTweet.useMutation();
    const postTweet = () => {
        tweetMutation.mutate(tweetContent);
    };

    const clearTweet = () => {};
    return (
        <div className="p-4 flex border-b-[1px] border-${borderColor} w-full">
            <ProfileImage twitterProfile={twitterProfile} />
            <div className={`flex flex-col px-2 w-full gap-2`}>
                {isExpanded && <AudienceDropdown />}
                <MakeTweetArea
                    placeholder="What is happening?!"
                    onChange={(e) => handleContentChange(e)}
                    onFocus={() => setIsExpanded(true)}
                    tweetContent={tweetContent}
                />
                {quote && <div className="border flex justify-center items-center">{quote}</div>}
                {isExpanded && <WhoCanReply onClick={() => {}} />}
                <div className={`${isExpanded && `border-b py-1`}`}></div>
                <div className="pt-2 flex w-full">
                    <BottomIcons />
                    <div className="flex ml-auto gap-2">
                        {isExpanded && (
                            <>
                                {tweetContent.length !== 0 && (
                                    <>
                                        {!postTooMuch && (
                                            <CircleProgressBar
                                                value={percentage}
                                                isWarning={postWarning}
                                                isExceeded={isExpanded}
                                                text={`${postWarning ? maxContent - tweetContent.length : ""}`}
                                            />
                                        )}
                                        {postTooMuch && (
                                            <div className="flex justify-center items-center">
                                                <span className={`text-sm text-${COLOR_ERROR}`}>{`-${
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
                        <PostMessage onClick={postTweet} disabled={postDisabled}>
                            <span>Post</span>
                        </PostMessage>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeTweet;
