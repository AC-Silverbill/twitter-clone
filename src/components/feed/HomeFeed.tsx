"use client";

import React, { useEffect, useState } from "react";
import { Tweet as TweetType } from "~/types";
import { api } from "~/utils/api";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useUser from "~/hooks/useUser";

import Tab from "../Tab";
import Feed from "./Feed";
import Tweet from "../Tweet";
import MakeTweet from "../MakeTweet";
import ContentTitle from "../ContentTitle";
import ExampleTweets from "../testing/ExampleTweets";

const HomeFeed = () => {
    const [tweets, setTweets] = useState<TweetType[]>([]);
    const getTweets = api.tweet.getAllTweets.useQuery();
    const data = getTweets.data;
    //TODO: have something in dependency for useEffect
    console.log(data);
    useEffect(() => {
        if (data) setTweets(data);
    }, [data]);

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
            {tweets.length !== 0 && tweets.map((tweet) => <Tweet tweet={tweet} />)}
            <ExampleTweets />
        </Feed>
    );
};

export default HomeFeed;
