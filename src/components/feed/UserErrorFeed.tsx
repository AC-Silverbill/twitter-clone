import React from "react";
import { useRouter } from "next/router";
import { Profile } from "~/types";
import useNavigation from "~/navigation";
import { api } from "~/utils/api";
import getLocals from "~/utils/getLocals";
import convertToReadableString from "~/utils/convertToReadableNumber";
import useUser from "~/hooks/useUser";
import useEditProfileModal from "~/hooks/useEditProfileModal";

import Tab from "../Tab";
import Feed from "./Feed";
import Icon from "../Icon";
import Button from "../Button";
import StickyHeader from "../StickyHeader";
import ProfileHandle from "../ProfileHandle";
import ProfilePicture from "../ProfilePicture";
import { FaArrowLeft } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
interface UserFeedProps {
    twitterProfile: Profile;
    children: React.ReactNode;
}

const UserFeed = ({ twitterProfile, children }: UserFeedProps) => {
    const router = useRouter();
    const navigator = useNavigation();
    const username = router.asPath.replace(/\//, "");

    const profileTRPC = api.user.getProfile.useQuery({ username: username });
    const userTRPC = api.tweet.getTweetsFromUser.useQuery({ username: twitterProfile.username });
    const followTRPC = api.user.followUser.useMutation();
    const { openEditProfileModal } = useEditProfileModal();
    const { twitterProfile: myProfile, isLoading } = useUser();
    const { COLOR_WHITE_HIGHLIGHTED, COLOR_BORDER, COLOR_SECONDARY } = getLocals("colors");
    const { USER_HOME, USER_REPLIES, USER_HIGHLIGHTS, USER_MEDIA, USER_LIKES } = getLocals("routes");
    const userRoutes = {
        USER_HOME: USER_HOME(twitterProfile.username),
        USER_REPLIES: USER_REPLIES(twitterProfile.username),
        USER_HIGHLIGHTS: USER_HIGHLIGHTS(twitterProfile.username),
        USER_MEDIA: USER_MEDIA(twitterProfile.username),
        USER_LIKES: USER_LIKES(twitterProfile.username),
    };

    type routesType = keyof typeof userRoutes;
    const navigateBack = () => {
        //TODO: navigator.back is not correct for some reason. need to create my own /back global hook
        navigator.push("/home");
    };

    const EditOrFollowButton = () => {
        if (twitterProfile.username === myProfile.username) {
            return (
                <Button onClick={openEditProfileModal} buttonTemplate="WHITE_BG">
                    Edit profile
                </Button>
            );
        } else {
            return (
                <Button onClick={openEditProfileModal} buttonTemplate="WHITE_BG">
                    Follow
                </Button>
            );
        }
    };
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
                        <div className="text-xs font-light">{`${twitterProfile.tweets ?? 0} posts`}</div>
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
                                <EditOrFollowButton />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start px-4 p-2">
                            <h2 className="text-xl font-bold">{twitterProfile.nickname ?? twitterProfile.username}</h2>
                            <ProfileHandle twitterProfile={twitterProfile} className="text-sm" />
                            <p className="min-h-[20px] pt-3">{twitterProfile.bio}</p>
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
                            <Tab route={USER_HOME(twitterProfile.username)} title="Posts" className="" />
                            <Tab route={USER_REPLIES(twitterProfile.username)} title="Replies" />
                            <Tab route={USER_HIGHLIGHTS(twitterProfile.username)} title="Highlights" />
                            <Tab route={USER_MEDIA(twitterProfile.username)} title="Media" />
                            <Tab route={USER_LIKES(twitterProfile.username)} title="Likes" />
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </Feed>
    );
};

export default UserFeed;
