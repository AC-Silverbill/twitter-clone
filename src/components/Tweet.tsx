import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Tweet } from "~/types";
import getLocals from "~/utils/getLocals";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useAuthModal from "~/hooks/useAuthModal";
import useMiscModal from "~/hooks/useMiscModal";
import useReplyModal from "~/hooks/useReplyModal";
import useTweetModal from "~/hooks/useTweetModal";
import useQuoteModal from "~/hooks/useQuoteModal";

import Icon from "./Icon";
import { BsFillBarChartFill } from "react-icons/bs";
import ReplyIcon from "./icons/ReplyIcon";
import QuoteIcon from "./icons/QuoteIcon";
import LikeIcon from "./icons/LikeIcon";
import StatsIcon from "./icons/StatsIcon";

interface TweetProps {
    tweet: Tweet;
}

const Tweet = ({ tweet: { id, authorId, author, postId, content, likes, retweets, timeCreated, attachments, reference } }: TweetProps) => {
    //TODO: getAuthor from authorId in tweet

    const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_BORDER, COLOR_LIGHT_GRAY } = getLocals("colors");
    const { data } = useSession();
    const { openAuthModal } = useAuthModal();
    const { openMiscModal } = useMiscModal();

    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-4 flex border-b-[1px] border-${COLOR_BORDER} w-full hover:bg-${COLOR_LIGHT_GRAY}`}>
            <div>
                <Image
                    src={author.image || ""}
                    alt={`Profile Picture of ${authorId}`}
                    width={40}
                    height={40}
                    className="rounded-full flex flex-initial"
                />
            </div>

            <div className="flex flex-col px-4 flex-1 h-full">
                <div className="flex gap-2">
                    <h2 className="font-bold cursor-pointer">{author.name}</h2>
                    <span className={`text-${COLOR_SECONDARY} cursor-pointer`}>{`@${author.name}`}</span>
                    <div>·</div>
                    <div>1hr</div>
                </div>
                <div className="flex justify-self-end">{content}</div>
                <div className="pt-2 flex justify-evenly w-full">
                    <ReplyIcon />
                    <QuoteIcon />
                    <LikeIcon />
                    <StatsIcon />
                </div>
            </div>
        </div>
    );
};

export default Tweet;
