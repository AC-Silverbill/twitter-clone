"use client";

import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import getLocal from "~/utils/getLocal";
import isValidSession from "~/utils/isValidSession";
import useUser from "~/hooks/useUser";
import useTweetModal from "~/hooks/useTweetModal";
import useAuthModal from "~/hooks/useAuthModal";

import Button from "./Button";
import Signout from "./Signout";
import SideItem from "./SideItem";
import { AiOutlineHome, AiTwotoneHome, AiOutlineBell, AiTwotoneBell } from "react-icons/ai";
import { BsPerson, BsPersonFill } from "react-icons/bs";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { UploadButton, UploadDropzone, Uploader } from "~/utils/uploadthing";
import UploadImage from "./messaging/UploadFile";

const Sidebar = () => {
    const router = useRouter();
    const { data } = useSession();
    const { twitterProfile } = useUser();
    const { openTweetModal } = useTweetModal();
    const { openAuthModal } = useAuthModal();
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");
    const selectedColor = getLocal("colors", "COLOR_SELECTED");
    const homeRoute = getLocal("routes", "YOUR_HOME");
    const notificationsRoute = getLocal("routes", "YOUR_NOTIFICATIONS");
    const bookmarksRoute = getLocal("routes", "YOUR_BOOKMARKS");
    const profileRoute = getLocal("routes", "USER_HOME")(twitterProfile.username);

    const HomeIcon = router.pathname === homeRoute ? AiTwotoneHome : AiOutlineHome;
    const NotificationsIcon = router.pathname === notificationsRoute ? AiTwotoneBell : AiOutlineBell;
    const BookmarksIcon = router.pathname === bookmarksRoute ? FaBookmark : FaRegBookmark;
    const ProfileIcon = router.asPath.includes(profileRoute) ? BsPersonFill : BsPerson;

    if (!isValidSession(data)) {
        return (
            <nav className="sticky flex flex-col p-4 px-10 pb-20 border border-gray-100 h-[100vh] min-w-[150px] top-0 left-0">
                <Button
                    className={`mt-2 rounded-3xl font-bold text-xl p-2 px-4 text-white bg-${primaryColor}`}
                    onClick={() => openAuthModal("default")}
                >
                    Login
                </Button>
            </nav>
        );
    } else {
        return (
            <nav className="sticky p-4 px-10 pb-20 border border-gray-100 h-[100vh] top-0 left-0 z-[0]">
                <ul className="flex flex-col">
                    <SideItem icon={<HomeIcon />} route={homeRoute} title="Home" />
                    <SideItem icon={<NotificationsIcon />} route={notificationsRoute} title="Notifications" />
                    <SideItem icon={<BookmarksIcon />} route={bookmarksRoute} title="Bookmarks" />
                    <SideItem icon={<ProfileIcon />} route={profileRoute} title="Profile" />
                    <Signout className="mt-2 text-sm md:text-xl" />
                    <Button
                        className={`mt-2 rounded-3xl font-bold text-sm md:text-xl px-4 p-2 text-white bg-${primaryColor}`}
                        onClick={() => openTweetModal()}
                    >
                        Post
                    </Button>
                </ul>
            </nav>
        );
    }
};

export default Sidebar;
