import React from "react";
import { Profile } from "~/types";
import useNavigation from "~/navigation";

import Feed from "./Feed";
import Button from "../Button";
import StickyHeader from "../StickyHeader";
import { FaArrowLeft } from "react-icons/fa";
import Icon from "../Icon";
interface UserContent {
    twitterProfile: Profile;
}

const UserFeed = ({ twitterProfile }: UserContent) => {
    const navigator = useNavigation();

    const navigateBack = () => {
        navigator.back();
    };
    return (
        <Feed>
            <StickyHeader>
                <div className="flex">
                    <div className="flex justify-center items-center px-2">
                        <Icon onClick={navigateBack}>
                            <FaArrowLeft />
                        </Icon>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-lg">{twitterProfile.username}</h2>
                        <div className="text-xs font-light">{`${twitterProfile.tweets?.length ?? "0"} posts`}</div>
                    </div>
                </div>
            </StickyHeader>
        </Feed>
    );
};

export default UserFeed;
