import Image from "next/image";
import React from "react";
import { Tweet } from "~/types";

interface TweetProps {
    tweet: Tweet;
}

const Tweet = ({ tweet: { id, authorId, postId, content, likes, retweets } }: TweetProps) => {
    //TODO: refactor into fetching the author's pfp
    return (
        <div>
            <Image src={"~/public/images/test1"} alt={`Profile Picture of ${authorId}`} />
            <div></div>
            {id}
        </div>
    );
};

export default Tweet;
