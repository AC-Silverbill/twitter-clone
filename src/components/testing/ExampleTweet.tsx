import React from "react";
import { Tweet as ExampleTweet } from "~/types";
import Image from "next/image";
import { useSession } from "next-auth/react";
import getLocals from "~/utils/getLocals";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useAuthModal from "~/hooks/useAuthModal";

import Icon from "../Icon";
import Message from "../Message";
import ReplyIcon from "../icons/ReplyIcon";
import QuoteIcon from "../icons/QuoteIcon";
import LikeIcon from "../icons/LikeIcon";
import StatsIcon from "../icons/StatsIcon";

interface ExampleTweetProps {
    tweet: ExampleTweet;
}

const ExampleTweet = ({ tweet }: ExampleTweetProps) => {
    //TODO: getAuthor from authorId in tweet

    const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_BORDER, COLOR_LIGHT_GRAY } = getLocals("colors");
    const { openAuthModal } = useAuthModal();

    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-4 flex border-b-[1px] border-${COLOR_BORDER} w-full hover:bg-${COLOR_LIGHT_GRAY}`}>
            <div>
                <Image
                    src={tweet.author.image || ""}
                    alt={`Profile Picture of ${tweet.author.id}`}
                    width={40}
                    height={40}
                    className="rounded-full flex flex-initial"
                />
            </div>

            <div className="flex flex-col px-4 flex-1 h-full">
                <div className="flex gap-2">
                    <h2 className="font-bold cursor-pointer hover:underline">{tweet.author.nickname}</h2>
                    <span className={`text-${COLOR_SECONDARY} cursor-pointer`}>{`@${tweet.author.nickname}`}</span>
                    <div>·</div>
                    <div>1hr</div>
                    <div className="text-red-500 font-bold">TEST TWEET</div>
                </div>
                <div className="flex justify-self-end">{tweet.content}</div>
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

export default ExampleTweet;
