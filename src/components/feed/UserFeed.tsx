import React from "react";
import { Profile } from "~/types";
import useNavigation from "~/navigation";
import getLocals from "~/utils/getLocals";

import Feed from "./Feed";
import Icon from "../Icon";
import Button from "../Button";
import StickyHeader from "../StickyHeader";
import { FaArrowLeft } from "react-icons/fa";
import ProfilePicture from "../ProfilePicture";
interface UserFeedProps {
    twitterProfile: Profile;
}

const UserFeed = ({ twitterProfile }: UserFeedProps) => {
    const navigator = useNavigation();
    const { COLOR_BORDER } = getLocals("colors");
    const navigateBack = () => {
        //TODO: navigator.back is not correct for some reason. need to create my own /back global hook
        navigator.push("/home");
    };
    return (
        <Feed>
            <StickyHeader>
                <div className="flex">
                    <div className="flex justify-center items-center px-3 pr-6">
                        <Icon onClick={navigateBack}>
                            <FaArrowLeft />
                        </Icon>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-lg py-[2px]">{twitterProfile.username}</h2>
                        <div className="text-xs font-light">{`${twitterProfile.tweets?.length ?? "0"} posts`}</div>
                    </div>
                </div>
            </StickyHeader>
            <div className={`flex flex-col h-80 border-b-[1px] border-${COLOR_BORDER}`}>
                <div className="example-bg bg-gray-300 flex-1"></div>
                <div className="flex-1">
                    <div className="p-2">
                        <div className="">
                            <ProfilePicture twitterProfile={twitterProfile} className="p-2 flex justify-start mt-[-15%]" size="LARGEST" />
                        </div>
                    </div>
                </div>
            </div>
        </Feed>
    );
};

export default UserFeed;
