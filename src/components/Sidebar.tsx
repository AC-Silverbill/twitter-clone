"use client";

import React from "react";
import { useRouter } from "next/router";
import getLocal from "~/utils/getLocal";
import useUser from "~/hooks/useUser";

import { AiOutlineHome, AiTwotoneHome, AiOutlineBell, AiTwotoneBell } from "react-icons/ai";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { GoHash } from "react-icons/go";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import SideItem from "./SideItem";

const Sidebar = () => {
    const router = useRouter();
    const { twitterUser } = useUser();
    const selectedColor = getLocal("colors", "COLOR_SELECTED");
    const homeRoute = getLocal("routes", "YOUR_HOME");
    const exploreRoute = getLocal("routes", "YOUR_EXPLORE");
    const notificationsRoute = getLocal("routes", "YOUR_NOTIFICATIONS");
    const bookmarksRoute = getLocal("routes", "YOUR_BOOKMARKS");
    const profileRoute = getLocal("routes", "USER_HOME")(twitterUser.name);

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
        </div>
    );
};

export default Sidebar;
