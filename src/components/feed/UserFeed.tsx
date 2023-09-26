import React from "react";
import { Profile } from "~/types";

interface UserContent {
    twitterProfile: Profile;
}

const UserFeed = ({ twitterProfile }: UserContent) => {
    return (
        <div className="flex flex-col">
            <div className="h-[100vh]">{twitterProfile.name} is here</div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default UserFeed;
