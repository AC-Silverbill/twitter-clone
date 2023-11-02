"use client";

import React, { useRef, useState } from "react";
import { ReferenceTweet, Tweet } from "~/types";
import { UploadFileResponse } from "uploadthing/client";
import useUser from "~/hooks/useUser";
import { api } from "~/utils/api";
import getLocals from "~/utils/getLocals";

import Message from "./Message";
import MiddleBar from "./MiddleBar";
import TweetImage from "./TweetImage";
import MakeTweetArea from "./MakeTweetArea";
import ProfilePicture from "./ProfilePicture";
import BottomIcons from "./messaging/BottomIcons";
import PostMessage from "./messaging/PostMessage";
import WhoCanReply from "./messaging/WhoCanReply";
import AddAnotherPost from "./messaging/AddAnotherPost";
import AudienceDropdown from "./messaging/AudienceDropdown";
import CircleProgressBar from "./messaging/CircleProgressBar";

interface MakeTweetProps {
    quote?: Tweet;
    defaultExpanded?: boolean;
}

const MakeTweet = ({ quote, defaultExpanded = false }: MakeTweetProps) => {
    const { twitterProfile } = useUser();
    const [tweetContent, setTweetContent] = useState("");
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [attachments, setAttachments] = useState<string[]>([]);
    const { COLOR_ERROR } = getLocals("colors");

    //TODO: import maxContent from a global settings list. maybe throw it in constants?
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
    const replyMutation = api.tweet.postReply.useMutation();

    const handlePost = () => {
        if (quote) {
            postQuote();
        } else {
            postTweet();
        }
    };

    const postQuote = () => {
        replyMutation.mutate({
            replyReferenceId: quote!.id,
            content: tweetContent,
            attachments: attachments,
        });
    };

    const postTweet = () => {
        tweetMutation.mutate({ content: tweetContent, attachments: attachments });
    };

    const clearTweet = () => {};

    //TODO: make openingImage similar to twitter, as a modal

    return (
        <div className={`p-4 flex border-b-[1px] w-full`}>
            <ProfilePicture twitterProfile={twitterProfile} />
            <div className={`flex flex-col px-2 w-full gap-2`}>
                {isExpanded && <AudienceDropdown />}
                <MakeTweetArea
                    placeholder="What is happening?!"
                    onChange={(e) => handleContentChange(e)}
                    onFocus={() => setIsExpanded(true)}
                    tweetContent={tweetContent}
                />
                {attachments && attachments.map((attachment) => <TweetImage attachment={attachment} />)}
                {quote && <div className="border flex justify-center items-center">{<Message tweet={quote} />}</div>}
                {isExpanded && <WhoCanReply onClick={() => {}} />}
                <div className={`${isExpanded && `border-b py-1`}`}></div>
                <div className="pt-2 flex w-full">
                    <BottomIcons useStateAttachments={{ attachments: attachments, setAttachments: setAttachments }} />
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
                        <PostMessage onClick={handlePost} disabled={postDisabled}>
                            <span>Post</span>
                        </PostMessage>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeTweet;
