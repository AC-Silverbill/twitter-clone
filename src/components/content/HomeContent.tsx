import React from "react";
import useUser from "~/hooks/useUser";

import Tab from "../Tab";
import ContentTitle from "../ContentTitle";
import Tweet from "../Tweet";

const HomeContent = () => {
    const user = useUser();

    const exampleTweet: Tweet = {
        id: 1,
        authorId: 21,
        postId: 4,
        content: "hello everyone!",
        likes: [43],
        retweets: [],
    };

    return (
        <div className="flex flex-col">
            <div id="heading" className="border-b-[1px] border-[#000000]">
                <ContentTitle title="Home" />
                <div className="flex">
                    <Tab title="For You" handleClick={() => {}} />
                    <Tab title="Following" handleClick={() => {}} />
                </div>
            </div>
            <Tweet tweet={exampleTweet} />
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default HomeContent;
