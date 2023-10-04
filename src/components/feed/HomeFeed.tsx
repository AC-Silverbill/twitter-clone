"use client";

import React, { useEffect, useState } from "react";
import { Tweet as TweetType } from "~/types";
import { api } from "~/utils/api";

import Tab from "../Tab";
import Feed from "./Feed";
import Tweet from "../Tweet";
import MakeTweet from "../MakeTweet";
import ContentTitle from "../ContentTitle";
import ExampleTweets from "../testing/ExampleTweets";
import StickyHeader from "../StickyHeader";

const HomeFeed = () => {
    const [tweets, setTweets] = useState<TweetType[]>([]);
    const [category, setCategory] = useState<"Trending" | "Following">("Trending");

    //TODO: add the 2 different routes
    const getTweets = api.tweet.getFeed.useQuery({ skip: 2 });
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
                    {/**TODO: sync onClick with 2 types of getAllTweets routes */}
                    <Tab title="Trending" onClick={() => {}} />
                    <Tab title="Following" onClick={() => {}} />
                </div>
            </StickyHeader>
            <MakeTweet />
            {tweets.length !== 0 && tweets.map((tweet) => <Tweet tweet={tweet} />)}
            <ExampleTweets />
        </Feed>
    );
};

export default HomeFeed;
