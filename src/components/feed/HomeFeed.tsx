"use client";

import React, { useEffect, useState } from "react";
import { Tweet as TweetType } from "~/types";
import { api } from "~/utils/api";
import getLocals from "~/utils/getLocals";

import Tab from "../Tab";
import Feed from "./Feed";
import Tweet from "../Tweet";
import MakeTweet from "../MakeTweet";
import ContentTitle from "../ContentTitle";
import StickyHeader from "../StickyHeader";
import ExampleTweets from "../testing/ExampleTweets";
import { Random } from "~/utils/Random";

const HomeFeed = () => {
    const [tweets, setTweets] = useState<TweetType[]>([]);
    const [category, setCategory] = useState<"Trending" | "Following">("Trending");
    const { COLOR_PRIMARY } = getLocals("colors");
    //TODO: add the 2 different routes
    const getTweetsTrending = api.tweet.getFeedTrending.useQuery({ skip: 0 });
    const getTweetsForYou = api.tweet.getFeedForYou.useQuery({ skip: 0 });
    let data: typeof getTweetsTrending.data | typeof getTweetsForYou.data;
    if (category === "Trending") {
        data = getTweetsTrending.data;
    }

    if (category === "Following") {
        data = getTweetsForYou.data;
    }

    useEffect(() => {
        if (data && data?.length && data.length > 0) {
            const reversedData: TweetType[] = [];
            for (let i = 0; i < data.length; i++) {
                reversedData.push(data[data.length - i]);
            }

            setTweets(data);
        }
    }, [data, category]);

    return (
        <Feed>
            <StickyHeader>
                <ContentTitle title="Home" />
                <div className="flex">
                    {/**TODO: sync onClick with 2 types of getAllTweets routes */}
                    <Tab
                        title="Trending"
                        onClick={() => setCategory("Trending")}
                        className={`${category === "Trending" ? `border-${COLOR_PRIMARY}` : ""}`}
                    />
                    <Tab
                        title="Following"
                        onClick={() => setCategory("Following")}
                        className={`${category === "Following" ? `border-${COLOR_PRIMARY}` : ""}`}
                    />
                </div>
            </StickyHeader>
            <MakeTweet />
            {tweets.length !== 0 && tweets.map((tweet) => <Tweet tweet={tweet} key={Random.createRandomNumber(1000)} />)}
            <ExampleTweets />
        </Feed>
    );
};

export default HomeFeed;
