import React from "react";
import useUser from "~/hooks/useUser";

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
                    <Tab title="All" onClick={() => {}} />
                    <Tab title="Verified" onClick={() => {}} />
                    <Tab title="Mentions" onClick={() => {}} />
                </div>
            </StickyHeader>
            <div className="h-[100vh]">notifications</div>
        </div>
    );
};

export default NotificationsFeed;
