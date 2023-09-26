import Image from "next/image";
import React from "react";
import { Tweet } from "~/types";
import getLocal from "~/utils/getLocal";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useAuthModal from "~/hooks/useAuthModal";
import useMiscModal from "~/hooks/useMiscModal";

import { FaRegMessage } from "react-icons/fa6";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import Icon from "./Icon";

interface TweetProps {
    tweet: Tweet;
}

const Tweet = ({ tweet: { id, authorId, author, postId, content, likes, retweets, timeCreated, attachments, reference } }: TweetProps) => {
    //TODO: getAuthor from authorId in tweet

    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const secondaryColor = getLocal("colors", "COLOR_SECONDARY");
    const borderColor = getLocal("colors", "COLOR_BORDER");
    const tertiaryColor = getLocal("colors", "COLOR_TERTIARY");
    const pinkColor = getLocal("colors", "COLOR_PINK");
    const { openAuthModal } = useAuthModal();
    const { openMiscModal } = useMiscModal();

    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-4 flex border-b-[1px] border-${borderColor} w-full`}>
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
                    <span className={`text-${secondaryColor} cursor-pointer`}>{`@${author.name}`}</span>
                    <div>·</div>
                    <div>1hr</div>
                </div>
                <div className="flex justify-self-end">{content}</div>
                <div className="pt-2 flex justify-evenly w-full">
                    <Icon key={"reply"} onClick={() => openAuthModal("reply")} className="cursor-pointer">
                        <FaRegMessage className={`transform -scale-x-100 group-hover:text-${primaryColor}`} />
                    </Icon>
                    <Icon key={"retweet"} onClick={() => openAuthModal("retweet")} className={`cursor-pointer hover:bg-[${tertiaryColor}]`}>
                        <HiOutlineArrowPathRoundedSquare className={`transform flex-1 scale-110 group-hover:text-${tertiaryColor}`} />
                    </Icon>
                    <Icon key={"like"} onClick={() => openAuthModal("like")} className={`cursor-pointer hover:bg-[${pinkColor}]`}>
                        <AiOutlineHeart className={`transform flex-1 group-hover:text-${pinkColor}`} />
                    </Icon>
                    <Icon key={"stats"} onClick={() => openMiscModal("stats")} className="cursor-pointer">
                        <BsFillBarChartFill className={`transform flex-1 group-hover:text-${primaryColor}`} />
                    </Icon>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
