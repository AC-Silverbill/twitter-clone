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
import { FaRegMessage } from "react-icons/fa6";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";

interface TweetProps {
    tweet: Tweet;
}

const Tweet = ({ tweet: { id, authorId, author, postId, content, likes, retweets, timeCreated, attachments, reference } }: TweetProps) => {
    //TODO: getAuthor from authorId in tweet

    const { COLOR_PRIMARY, COLOR_SECONDARY, COLOR_TERTIARY, COLOR_BORDER, COLOR_WHITE_HIGHLIGHTED, COLOR_PINK } = getLocals("colors");
    const { data } = useSession();
    const { openAuthModal } = useAuthModal();
    const { openMiscModal } = useMiscModal();
    const { openTweetModal } = useTweetModal();
    const { openReplyModal } = useReplyModal();
    const { openQuoteModal } = useQuoteModal();

    const handleClick = () => {};

    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-4 flex border-b-[1px] border-${COLOR_BORDER} w-full hover:bg-${COLOR_WHITE_HIGHLIGHTED}`}>
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
                    <Icon key={"reply"} onClick={() => openAuthModal("reply")} className="cursor-pointer">
                        <FaRegMessage className={`transform -scale-x-100 group-hover:text-${COLOR_PRIMARY}`} />
                    </Icon>
                    <Icon
                        key={"retweet"}
                        onClick={() => openAuthModal("retweet")}
                        className={`cursor-pointer hover:bg-[${COLOR_TERTIARY}]`}
                    >
                        <HiOutlineArrowPathRoundedSquare className={`transform flex-1 scale-110 group-hover:text-${COLOR_TERTIARY}`} />
                    </Icon>
                    <Icon key={"like"} onClick={() => openAuthModal("like")} className={`cursor-pointer hover:bg-[${COLOR_PINK}]`}>
                        <AiOutlineHeart className={`transform flex-1 group-hover:text-${COLOR_PINK}`} />
                    </Icon>
                    <Icon key={"stats"} onClick={() => openMiscModal("stats")} className="cursor-pointer">
                        <BsFillBarChartFill className={`transform flex-1 group-hover:text-${COLOR_PRIMARY}`} />
                    </Icon>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
