import React, { useEffect, useState } from "react";
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
import Actions from "~/utils/Actions";
import { Random } from "~/utils/Random";

interface TweetProps {
    tweet: Tweet;
    testMode?: boolean;
}

const Tweet = ({ tweet, testMode = false }: TweetProps) => {
    const [timeSinceString, setTimeSinceString] = useState<string>("");
    const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_BORDER, COLOR_LIGHT_GRAY } = getLocals("colors");

    useEffect(() => {
        setTimeSinceString(Actions.convertDateToLastCreatedTwitterTime(tweet.timeCreated));
    }, []);

    return (
        <div className={`p-4 flex border-b-[1px] border-${COLOR_BORDER} w-full max-w-full hover:bg-${COLOR_LIGHT_GRAY}`}>
            <ProfilePicture twitterProfile={tweet.author} />

            <div className="flex flex-col px-4 flex-1 h-full">
                <div className="flex gap-2">
                    <h2 className="font-bold cursor-pointer hover:underline">{tweet.author.nickname ?? tweet.author.username}</h2>
                    <ProfileHandle twitterProfile={tweet.author} className="self-center" />
                    <div>·</div>
                    <div>{timeSinceString}</div>
                    {testMode && <div className="text-red-400">TESTING</div>}
                </div>
                <div className="_line-break-anywhere flex justify-self-end">{tweet.content}</div>
                {tweet.attachments &&
                    tweet.attachments.map((attachment) => (
                        <TweetImage attachment={attachment} key={`${attachment}${Random.createRandomString(16)}`} />
                    ))}
                {tweet.reference && (
                    <div className="border rounded-2xl mt-2">
                        <Message reference={tweet.reference} />
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
