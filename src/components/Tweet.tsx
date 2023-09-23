import Image from "next/image";
import React from "react";
import { Tweet } from "~/types";

interface TweetProps {
    tweet: Tweet;
}

const Tweet = ({ tweet: { id, authorId, postId, content, likes, retweets } }: TweetProps) => {
    //TODO: refactor into fetching the author's pfp
    return (
        <div className="p-2">
            <Image src={"/images/test1.png"} alt={`Profile Picture of ${authorId}`} width={50} height={50} className="rounded-full" />
            <div></div>
            {id}
        </div>
    );
};

export default Tweet;
