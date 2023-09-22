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
    const user = useUser();
    const selectedColor = getLocal("colors", "COLOR_SELECTED");
    const HomeIcon = router.pathname === "/" ? AiTwotoneHome : AiOutlineHome;
    const ExploreIcon = GoHash; //theres no good slightly bolder one
    const NotificationsIcon = router.pathname === "/users" ? AiTwotoneBell : AiOutlineBell;
    const BookmarksIcon = router.pathname === "/users" ? FaBookmark : FaRegBookmark;
    const ProfileIcon = router.pathname === "/users" ? BsPersonFill : BsPerson;

    const HomeRoute = getLocal("routes", "YOUR_HOME");
    const ExploreRoute = getLocal("routes", "YOUR_EXPLORE");
    const NotificationeRoute = getLocal("routes", "YOUR_NOTIFICATIONS");
    const BookmarkeRoute = getLocal("routes", "YOUR_BOOKMARKS");
    const ProfileRoute = getLocal("routes", "USER_HOME")(user.user);

    return (
        <div className="fixed flex flex-col p-4 px-10 pb-20 border border-gray-100 h-[100vh] min-w-[200px] z-[1]">
            <SideItem icon={<HomeIcon />} route={HomeRoute} title="Home" />
            <SideItem icon={<ExploreIcon />} route={ExploreRoute} title="Explore" />
            <SideItem icon={<NotificationsIcon />} route={NotificationeRoute} title="Notifications" />
            <SideItem icon={<BookmarksIcon />} route={BookmarkeRoute} title="Bookmarks" />
            <SideItem icon={<ProfileIcon />} route={ProfileRoute} title="Profile" />
        </div>
    );
};

export default Sidebar;
