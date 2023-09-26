import React from "react";
import useUser from "~/hooks/useUser";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import Tab from "../Tab";
import ContentTitle from "../ContentTitle";
import Tweet from "../Tweet";

const ExploreFeed = () => {
    const [user1, user2] = [getTwitterProfile("one"), getTwitterProfile("two")];

    const exampleTweet: Tweet = {
        id: 1,
        authorId: 52,
        author: user1,
        postId: 4,
        content: "hello everyone!",
        likes: [12],
        retweets: [],
        timeCreated: "asdasd",
    };

    const exampleTweet2: Tweet = {
        id: 52,
        authorId: 21,
        author: user2,
        postId: 52,
        content:
            "Once upon a time, there was a horse named Course. He loved to eat, of course. Then one night, when he was eating, of course, he came across a porch. He sat on the porch, then died. The end.",
        likes: [44],
        retweets: [],
        timeCreated: "asdasd",
    };

    return (
        <>
            <div id="content" className="flex-[3] flex flex-col">
                <div id="heading" className="border-b-[1px] border-[#000000]">
                    <ContentTitle title="Explore" />
                    <div className="flex">
                        <Tab title="For you" handleClick={() => {}} />
                        <Tab title="Trending" handleClick={() => {}} />
                        <Tab title="News" handleClick={() => {}} />
                        <Tab title="Sports" handleClick={() => {}} />
                        <Tab title="Entertainment" handleClick={() => {}} />
                    </div>
                </div>
                <Tweet tweet={exampleTweet} />
                <Tweet tweet={exampleTweet2} />
            </div>
            <div id="discovery"></div>
        </>
    );
};

export default ExploreFeed;
