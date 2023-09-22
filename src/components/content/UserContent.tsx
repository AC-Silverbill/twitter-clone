import React from "react";
import { TwitterUser } from "~/types";

interface UserContent {
    user: TwitterUser;
}

const UserContent = ({ user }: UserContent) => {
    return (
        <div className="flex flex-col">
            <div className="h-[100vh]">{user.username} is here</div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default UserContent;
