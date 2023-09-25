import Image from "next/image";
import React from "react";
import { Tweet } from "~/types";
import getLocal from "~/utils/getLocal";

import { FaRegMessage } from "react-icons/fa6";
import { HiArrowPath } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";

interface TweetProps {
    tweet: Tweet;
}

const Tweet = ({ tweet: { id, authorId, author, postId, content, likes, retweets } }: TweetProps) => {
    const secondaryColor = getLocal("colors", "COLOR_SECONDARY");
    const borderColor = getLocal("colors", "COLOR_BORDER");
    //TODO: refactor into fetching the author's pfp
    return (
        <div className={`p-2 pl-4 flex border-b-[1px] border-[${borderColor}] w-full`}>
            <div>
                <Image
                    src={"/images/test1.png"}
                    alt={`Profile Picture of ${authorId}`}
                    width={40}
                    height={40}
                    className="rounded-full flex flex-initial"
                />
            </div>

            <div className="flex flex-col p-4 pt-0 flex-1">
                <div className="flex gap-2">
                    <h2 className="font-bold cursor-pointer">{author.username ?? author.name}</h2>
                    <span className={`text-[${secondaryColor}] cursor-pointer`}>{`@${author.name}`}</span>
                    <div>·</div>
                    <div>1hr</div>
                </div>
                <div className="flex">{content}</div>
                <div className="icons pt-2 flex w-full">
                    <FaRegMessage className="transform -scale-x-100 flex-1" />
                    <HiArrowPath className="transform flex-1 scale-110" />
                    <AiOutlineHeart className="transform flex-1" />
                    <BsFillBarChartFill className="transform flex-1" />
                </div>
            </div>
        </div>
    );
};

export default Tweet;
