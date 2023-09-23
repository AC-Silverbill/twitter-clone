import React from "react";
import useUser from "~/hooks/useUser";
import { TwitterUser } from "~/types";

import Tab from "../Tab";
import ContentTitle from "../ContentTitle";
import Tweet from "../Tweet";

const BookmarksContent = () => {
    const user = useUser();

    const exampleTweet: Tweet = {
        id: 1,
        authorId: 21,
        author: user,
        postId: 4,
        content: "hello everyone!",
        likes: [43],
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
            <Tweet tweet={exampleTweet} />
        </div>
    );
};

export default BookmarksContent;
