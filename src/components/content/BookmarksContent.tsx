import React from "react";
import useUser from "~/hooks/useUser";
import { TwitterUser } from "~/types";

import Tab from "../Tab";
import ContentTitle from "../ContentTitle";

const BookmarksContent = () => {
    const user = useUser();

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
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default BookmarksContent;
