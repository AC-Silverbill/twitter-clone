import React from "react";
import { TwitterUser } from "~/types";

interface UserContent {
    twitterUser: TwitterUser;
}

const UserFeed = ({ twitterUser }: UserContent) => {
    return (
        <div className="flex flex-col">
            <div className="h-[100vh]">{twitterUser.name} is here</div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default UserFeed;
