"use client";

import React from "react";
import useUser from "~/hooks/useUser";
import { Profile } from "~/types";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import Tab from "../Tab";
import ContentTitle from "../ContentTitle";
import Tweet from "../Tweet";

const BookmarksFeed = () => {
    const { twitterProfile } = useUser();

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
        <div className="flex flex-col">
            <div id="heading" className="border-b-[1px] border-[#000000]">
                <ContentTitle title="Bookmarks" />
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
    );
};

export default BookmarksFeed;
