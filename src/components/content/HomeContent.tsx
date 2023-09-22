import React from "react";
import { TwitterUser } from "~/types";

interface HomeContentProps {
    user: TwitterUser;
}

const HomeContent = ({ user }: HomeContentProps) => {
    return (
        <div className="flex flex-col">
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
            <div className="h-[100vh]">asdasd</div>
        </div>
    );
};

export default HomeContent;
