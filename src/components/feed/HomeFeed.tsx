"use client";

import React, { useEffect, useState } from "react";
import { Tweet as TweetType } from "~/types";
import { api } from "~/utils/api";
import { getTwitterProfile } from "~/utils/getTwitterUser";
import useUser from "~/hooks/useUser/useUser";

import Tab from "../Tab";
import Feed from "./Feed";
import Tweet from "../Tweet";
import MakeTweet from "../MakeTweet";
import ContentTitle from "../ContentTitle";
import ExampleTweets from "../testing/ExampleTweets";
import StickyHeader from "../StickyHeader";

const HomeFeed = () => {
    const [tweets, setTweets] = useState<TweetType[]>([]);
    const getTweets = api.tweet.getAllTweets.useQuery();
    const data = getTweets.data;
    //TODO: have something in dependency for useEffect
    useEffect(() => {
        if (data) setTweets(data);
    }, [data]);

    return (
        <Feed>
            <StickyHeader>
                <ContentTitle title="Home" />
                <div className="flex">
                    <Tab title="For You" handleClick={() => {}} />
                    <Tab title="Following" handleClick={() => {}} />
                </div>
            </StickyHeader>
            <MakeTweet />
            {tweets.length !== 0 && tweets.map((tweet) => <Tweet tweet={tweet} />)}
            <ExampleTweets />
        </Feed>
    );
};

export default HomeFeed;
