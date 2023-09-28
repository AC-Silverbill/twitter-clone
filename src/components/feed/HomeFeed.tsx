"use client";

import React from "react";
import useUser from "~/hooks/useUser";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import Tab from "../Tab";
import Feed from "./Feed";
import Tweet from "../Tweet";
import MakeTweet from "../MakeTweet";
import ContentTitle from "../ContentTitle";
import ExampleTweets from "../testing/ExampleTweets";

const HomeFeed = () => {
    return (
        <Feed>
            <div id="heading" className="border-b-[1px] border-[#000000]">
                <ContentTitle title="Home" />
                <div className="flex">
                    <Tab title="For You" handleClick={() => {}} />
                    <Tab title="Following" handleClick={() => {}} />
                </div>
            </div>
            <MakeTweet />
            <ExampleTweets />
        </Feed>
    );
};

export default HomeFeed;
