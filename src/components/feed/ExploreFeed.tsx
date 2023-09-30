import React from "react";
import useUser from "~/hooks/useUser";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import Tab from "../Tab";
import Tweet from "../Tweet";
import ContentTitle from "../ContentTitle";
import ExampleTweets from "../testing/ExampleTweets";
import StickyHeader from "../StickyHeader";

const ExploreFeed = () => {
    return (
        <>
            <div id="content" className="flex-[3] flex flex-col">
                <StickyHeader>
                    <ContentTitle title="Explore" />
                    <div className="flex">
                        <Tab title="For you" handleClick={() => {}} />
                        <Tab title="Trending" handleClick={() => {}} />
                        <Tab title="News" handleClick={() => {}} />
                        <Tab title="Sports" handleClick={() => {}} />
                        <Tab title="Entertainment" handleClick={() => {}} />
                    </div>
                </StickyHeader>
                <ExampleTweets />
            </div>
            <div id="discovery"></div>
        </>
    );
};

export default ExploreFeed;
