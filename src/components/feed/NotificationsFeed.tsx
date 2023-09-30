import React from "react";
import useUser from "~/hooks/useUser/useUser";

import ContentTitle from "../ContentTitle";
import Tab from "../Tab";
import StickyHeader from "../StickyHeader";

const NotificationsFeed = () => {
    //TODO: add notifications feed
    return (
        <div className="flex flex-col">
            <StickyHeader>
                <ContentTitle title="Notifications" />
                <div className="flex">
                    <Tab title="All" handleClick={() => {}} />
                    <Tab title="Verified" handleClick={() => {}} />
                    <Tab title="Mentions" handleClick={() => {}} />
                </div>
            </StickyHeader>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default NotificationsFeed;
