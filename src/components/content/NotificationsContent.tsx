import React from "react";
import useUser from "~/hooks/useUser";

import ContentTitle from "../ContentTitle";
import Tab from "../Tab";

const NotificationsContent = () => {
    const user = useUser();

    return (
        <div className="flex flex-col">
            <div id="heading" className="border-b-[1px] border-[#000000]">
                <ContentTitle title="Notifications" />
                <div className="flex">
                    <Tab title="All" handleClick={() => {}} />
                    <Tab title="Verified" handleClick={() => {}} />
                    <Tab title="Mentions" handleClick={() => {}} />
                </div>
            </div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default NotificationsContent;
