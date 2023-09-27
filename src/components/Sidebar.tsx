"use client";

import React from "react";
import { useRouter } from "next/router";
import getLocal from "~/utils/getLocal";
import useUser from "~/hooks/useUser";
import useTweetModal from "~/hooks/useTweetModal";

import { AiOutlineHome, AiTwotoneHome, AiOutlineBell, AiTwotoneBell } from "react-icons/ai";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { GoHash } from "react-icons/go";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import SideItem from "./SideItem";
import Signout from "./Signout";
import Button from "./Button";

const Sidebar = () => {
    const router = useRouter();
    const { twitterProfile } = useUser();
    const { openTweetModal } = useTweetModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const selectedColor = getLocal("colors", "COLOR_SELECTED");
    const homeRoute = getLocal("routes", "YOUR_HOME");
    const exploreRoute = getLocal("routes", "YOUR_EXPLORE");
    const notificationsRoute = getLocal("routes", "YOUR_NOTIFICATIONS");
    const bookmarksRoute = getLocal("routes", "YOUR_BOOKMARKS");
    const profileRoute = getLocal("routes", "USER_HOME")(twitterProfile.name);

    const HomeIcon = router.pathname === homeRoute ? AiTwotoneHome : AiOutlineHome;
    const ExploreIcon = GoHash; //theres no good slightly bolder one
    const NotificationsIcon = router.pathname === notificationsRoute ? AiTwotoneBell : AiOutlineBell;
    const BookmarksIcon = router.pathname === bookmarksRoute ? FaBookmark : FaRegBookmark;
    const ProfileIcon = router.asPath.includes(profileRoute) ? BsPersonFill : BsPerson;

    return (
        <div className="fixed flex flex-col p-4 px-10 pb-20 border border-gray-100 h-[100vh] min-w-[200px] z-[1]">
            <SideItem icon={<HomeIcon />} route={homeRoute} title="Home" />
            <SideItem icon={<ExploreIcon />} route={exploreRoute} title="Explore" />
            <SideItem icon={<NotificationsIcon />} route={notificationsRoute} title="Notifications" />
            <SideItem icon={<BookmarksIcon />} route={bookmarksRoute} title="Bookmarks" />
            <SideItem icon={<ProfileIcon />} route={profileRoute} title="Profile" />
            <Signout className="mt-2" />
            <Button
                className={`mt-2 rounded-3xl font-bold text-xl px-4 p-2 text-white bg-${primaryColor}`}
                onClick={() => openTweetModal()}
            >
                Post
            </Button>
        </div>
    );
};

export default Sidebar;
