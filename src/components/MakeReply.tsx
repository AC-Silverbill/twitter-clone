"use client";

import React, { useRef, useState } from "react";
import { Tweet } from "~/types";
import { api } from "~/utils/api";
import getLocals from "~/utils/getLocals";
import useUser from "~/hooks/useUser";
import useReplyModal from "~/hooks/useReplyModal";

import MiddleBar from "./MiddleBar";
import MakeTweetArea from "./MakeTweetArea";
import ProfilePicture from "./ProfilePicture";
import BottomIcons from "./messaging/BottomIcons";
import PostMessage from "./messaging/PostMessage";
import WhoCanReply from "./messaging/WhoCanReply";
import AddAnotherPost from "./messaging/AddAnotherPost";
import AudienceDropdown from "./messaging/AudienceDropdown";
import CircleProgressBar from "./messaging/CircleProgressBar";

interface MakeReplyProps {
    tweetReply: Tweet;
}
const MakeReply = ({ tweetReply }: MakeReplyProps) => {
    //TODO: import MaxContent from a global settings list. maybe throw it in constants?
    const maxContent = 300;

    const { twitterProfile } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const [tweetContent, setTweetContent] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const { closeReplyModal, reply, isOpen } = useReplyModal();
    const { COLOR_PRIMARY, COLOR_PRIMARY_DISABLED, COLOR_WHITE_HIGHLIGHTED, COLOR_WARNING, COLOR_ERROR } = getLocals("colors");

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTweetContent(e.currentTarget.textContent ?? "");
    };

    const percentage = Math.round((tweetContent.length / maxContent) * 100);
    const postDisabled = tweetContent.length === 0 || tweetContent.length > maxContent;
    const postWarning = percentage > 95;
    const postExceeded = tweetContent.length > maxContent;
    const postTooMuch = tweetContent.length > maxContent + 10;

    //TODO: work on postReply
    const replyMutation = api.tweet.postReply.useMutation();
    const postReply = () => {
        replyMutation.mutate({ referenceId: tweetReply.id, content: tweetContent, attachments: attachments });
    };

    return (
        <div className="p-4 flex border-b-[1px] border-${borderColor} w-full">
            <ProfilePicture twitterProfile={twitterProfile} />
            <div className={`flex flex-col px-2 w-full gap-2`}>
                {isExpanded && <AudienceDropdown />}
                <MakeTweetArea
                    placeholder={"Post your reply"}
                    onChange={(e) => handleContentChange(e)}
                    onFocus={() => setIsExpanded(true)}
                    tweetContent={tweetContent}
                />
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
                        <PostMessage onClick={postReply} disabled={postDisabled}>
                            <span>Reply</span>
                        </PostMessage>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeReply;
