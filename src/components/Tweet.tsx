import React from "react";
import { Tweet } from "~/types";
import { useSession } from "next-auth/react";
import getLocals from "~/utils/getLocals";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useAuthModal from "~/hooks/useAuthModal";

import Message from "./Message";
import ReplyIcon from "./icons/ReplyIcon";
import QuoteIcon from "./icons/QuoteIcon";
import LikeIcon from "./icons/LikeIcon";
import StatsIcon from "./icons/StatsIcon";
import ProfileHandle from "./ProfileHandle";
import ProfilePicture from "./ProfilePicture";
import TweetImage from "./TweetImage";

interface TweetProps {
    tweet: Tweet;
    testMode?: boolean;
}

const Tweet = ({ tweet, testMode = false }: TweetProps) => {
    //TODO: getAuthor from authorId in tweet

    const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_BORDER, COLOR_LIGHT_GRAY } = getLocals("colors");

    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-4 flex border-b-[1px] border-${COLOR_BORDER} w-full max-w-full hover:bg-${COLOR_LIGHT_GRAY}`}>
            <ProfilePicture twitterProfile={tweet.author} />

            <div className="flex flex-col px-4 flex-1 h-full">
                <div className="flex gap-2">
                    <h2 className="font-bold cursor-pointer hover:underline">{tweet.author.nickname ?? tweet.author.username}</h2>
                    <ProfileHandle twitterProfile={tweet.author} className="self-center" />
                    <div>·</div>
                    <div>1hr</div>
                    {testMode && <div className="text-red-400">TESTING</div>}
                </div>
                <div className="_line-break-anywhere flex justify-self-end">{tweet.content}</div>
                {tweet.attachments && tweet.attachments.map((attachment) => <TweetImage attachment={attachment} />)}
                {tweet.reference && (
                    <div className="border rounded-2xl mt-2">
                        <Message tweet={tweet.reference} />
                    </div>
                )}
                <div className="pt-2 flex justify-evenly w-full">
                    <ReplyIcon tweet={tweet} />
                    <QuoteIcon tweet={tweet} />
                    <LikeIcon tweet={tweet} />
                    <StatsIcon tweet={tweet} />
                </div>
            </div>
        </div>
    );
};

export default Tweet;
