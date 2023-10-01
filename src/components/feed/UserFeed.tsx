import React from "react";
import { Profile } from "~/types";
import useNavigation from "~/navigation";
import getLocals from "~/utils/getLocals";
import convertToReadableString from "~/utils/convertToReadableNumber";
import useUser from "~/hooks/useUser";
import useEditProfileModal from "~/hooks/useEditProfileModal";

import Feed from "./Feed";
import Icon from "../Icon";
import Button from "../Button";
import StickyHeader from "../StickyHeader";
import ProfileHandle from "../ProfileHandle";
import ProfilePicture from "../ProfilePicture";
import { FaArrowLeft } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import UserFeedSectionItem from "./UserFeedSectionItem";
import Tab from "../Tab";
interface UserFeedProps {
    twitterProfile: Profile;
}

const UserFeed = ({ twitterProfile }: UserFeedProps) => {
    const {} = useUser();
    const navigator = useNavigation();
    const { COLOR_WHITE_HIGHLIGHTED, COLOR_BORDER, COLOR_SECONDARY } = getLocals("colors");
    const { USER_HOME, USER_REPLIES, USER_HIGHLIGHTS, USER_MEDIA, USER_LIKES } = getLocals("routes");
    const { openEditProfileModal } = useEditProfileModal();
    const navigateBack = () => {
        //TODO: navigator.back is not correct for some reason. need to create my own /back global hook
        navigator.push("/home");
    };

    const GeneratedContent = () => <div>Test</div>;
    //TODO: add real followers/followed onto profile
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
            <div className={`flex flex-col h-96 border-b-[1px] border-${COLOR_BORDER}`}>
                <div className="example-bg bg-gray-300 flex-1"></div>
                <div className="flex-1">
                    <div className="w-full flex flex-col">
                        <div className="flex items-end">
                            <ProfilePicture twitterProfile={twitterProfile} className="p-2 flex justify-start mt-[-15%]" size="LARGEST" />
                            <div className="ml-auto flex items-start p-2">
                                <Button onClick={openEditProfileModal} buttonTemplate="WHITE_BG">
                                    Edit profile
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start px-4 p-2">
                            <h2 className="text-xl font-bold">{twitterProfile.nickname ?? twitterProfile.username}</h2>
                            <ProfileHandle twitterProfile={twitterProfile} className="text-sm" />
                            <p className="h-2">{twitterProfile.bio}</p>
                            <div className="flex items-center gap-1">
                                <LuCalendarDays className={`text-${COLOR_SECONDARY}`} size={12} />
                                <div className={`text-sm text-${COLOR_SECONDARY}`}>{`Joined ${twitterProfile.joinedAt.toLocaleString(
                                    undefined,
                                    { month: "long", year: "numeric" }
                                )}`}</div>
                            </div>
                            <div className="flex gap-5">
                                <div className="flex gap-1">
                                    <span className="font-bold">10</span>
                                    <span className={`text-${COLOR_SECONDARY}`}>Following</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="font-bold">{convertToReadableString(424222224)}</span>
                                    <span className={`text-${COLOR_SECONDARY}`}>Followers</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <Tab route={USER_HOME(twitterProfile.username)} title="Posts" onClick={() => {}} />
                            <Tab route={USER_REPLIES(twitterProfile.username)} title="Replies" onClick={() => {}} />
                            <Tab route={USER_HIGHLIGHTS(twitterProfile.username)} title="Highlights" onClick={() => {}} />
                            <Tab route={USER_MEDIA(twitterProfile.username)} title="Media" onClick={() => {}} />
                            <Tab route={USER_LIKES(twitterProfile.username)} title="Likes" onClick={() => {}} />
                        </div>
                    </div>
                </div>
            </div>
            <GeneratedContent />
        </Feed>
    );
};

export default UserFeed;
