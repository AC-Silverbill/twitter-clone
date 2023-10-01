"use client";

import React from "react";
import useUser from "~/hooks/useUser";
import { getTwitterProfile } from "~/utils/getTwitterUser";

import Tab from "../Tab";
import Tweet from "../Tweet";
import ContentTitle from "../ContentTitle";
import ExampleTweets from "../testing/ExampleTweets";
import Feed from "./Feed";
import StickyHeader from "../StickyHeader";
import ProfileHandle from "../ProfileHandle";

const BookmarksFeed = () => {
    //TODO: add bookmarks feed
    const { twitterProfile } = useUser();

    return (
        <Feed>
            <StickyHeader>
                <div className="flex flex-col items-start p-2">
                    <h2 className="font-bold">Bookmarks</h2>
                    <ProfileHandle className="text-sm" twitterProfile={twitterProfile} />
                </div>
            </StickyHeader>
        </Feed>
    );
};

export default BookmarksFeed;
