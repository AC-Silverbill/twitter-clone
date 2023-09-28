import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Tweet as Message } from "~/types";
import getLocals from "~/utils/getLocals";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useAuthModal from "~/hooks/useAuthModal";

import Icon from "./Icon";
import ReplyIcon from "./icons/ReplyIcon";
import QuoteIcon from "./icons/QuoteIcon";
import LikeIcon from "./icons/LikeIcon";
import StatsIcon from "./icons/StatsIcon";

interface TweetProps {
    tweet: Message;
}

const Message = ({ tweet: { id, type, author, timeCreated, content, likes, replies, retweets, reference } }: TweetProps) => {
    //TODO: getAuthor from authorId in tweet

    const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_BORDER, COLOR_LIGHT_GRAY, COLOR_LIGHT_GRAY_DARKER } = getLocals("colors");
    const { openAuthModal } = useAuthModal();

    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-4 flex cursor-pointer w-full border-${COLOR_BORDER}  hover:bg-${COLOR_LIGHT_GRAY_DARKER}`}>
            <div>
                <Image
                    src={author.image || ""}
                    alt={`Profile Picture of ${author.id}`}
                    width={40}
                    height={40}
                    className="rounded-full flex flex-initial"
                />
            </div>

            <div className="flex flex-col px-4 flex-1 h-full">
                <div className="flex gap-2">
                    <h2 className="font-bold">{author.name}</h2>
                    <span className={`text-${COLOR_SECONDARY}`}>{`@${author.name}`}</span>
                    <div>·</div>
                    <div>1hr</div>
                </div>
                <div className="flex justify-self-end">{content}</div>
            </div>
        </div>
    );
};

export default Message;
