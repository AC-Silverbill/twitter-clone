"use client";

import React from "react";
import useUser from "~/hooks/useUser";
import { Profile } from "~/types";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import Tab from "../Tab";
import Tweet from "../Tweet";
import ContentTitle from "../ContentTitle";
import ExampleTweets from "../testing/ExampleTweets";

const BookmarksFeed = () => {
    //TODO: add bookmarks feed
    const { twitterProfile } = useUser();

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
            <ExampleTweets />
        </div>
    );
};

export default BookmarksFeed;
