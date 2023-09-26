import Image from "next/image";
import React from "react";
import { Tweet } from "~/types";
import getLocal from "~/utils/getLocal";

import { FaRegMessage } from "react-icons/fa6";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import Icon from "./Icon";

interface TweetProps {
    tweet: Tweet;
}

const Tweet = ({ tweet: { id, authorId, author, postId, content, likes, retweets } }: TweetProps) => {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const secondaryColor = getLocal("colors", "COLOR_SECONDARY");
    const borderColor = getLocal("colors", "COLOR_BORDER");
    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-2 pl-4 flex border-b-[1px] border-${borderColor} w-full`}>
            <div>
                <Image
                    src={"/images/test1.png"}
                    alt={`Profile Picture of ${authorId}`}
                    width={40}
                    height={40}
                    className="rounded-full flex flex-initial"
                />
            </div>

            <div className="flex flex-col p-4 pt-0 flex-1 h-full">
                <div className="flex gap-2">
                    <h2 className="font-bold cursor-pointer">{author.name}</h2>
                    <span className={`text-${secondaryColor} cursor-pointer`}>{`@${author.name}`}</span>
                    <div>·</div>
                    <div>1hr</div>
                </div>
                <div className="flex justify-self-end">{content}</div>
                <div className="icons pt-2 flex justify-evenly w-full">
                    <Icon key={"reply"}>
                        <FaRegMessage className={`transform -scale-x-100 group-hover:text-${primaryColor}`} />
                    </Icon>
                    <Icon key={"retweet"}>
                        <HiOutlineArrowPathRoundedSquare className="transform flex-1 scale-110" />
                    </Icon>
                    <Icon key={"like"}>
                        <AiOutlineHeart className="transform flex-1" />
                    </Icon>
                    <Icon key={"stats"}>
                        <BsFillBarChartFill className="transform flex-1" />
                    </Icon>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
