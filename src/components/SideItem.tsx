"use client";

import { useRouter } from "next/router";
import React from "react";
import useUser from "~/hooks/useUser";
import useNavigation from "~/navigation";
import { AnyRoute, ContentComponent } from "~/types";
import getLocal from "~/utils/getLocal";

interface SideItemProps {
    icon: ContentComponent;
    route: AnyRoute<string>;
    title?: string;
}

//hooks for when selected
const SideItem = ({ icon, route, title }: SideItemProps) => {
    const navigator = useNavigation();
    const router = useRouter();

    const highlightedColor = getLocal("colors", "COLOR_WHITE_HIGHLIGHTED_DARKER");
    const selectedColor = getLocal("colors", "COLOR_SELECTED");
    const navigateToPage = (route: AnyRoute<string>) => {
        navigator.replace(route);
    };

    const isHighlighted = () => {
        if (router.asPath.includes(route)) return true;
        if (route === router.pathname) return true;

        return false;
    };

    return (
        <div
            className={`flex gap-2 p-2 hover:translate-x-2 hover:bg-${highlightedColor} transition cursor-pointer justify-center md:justify-start ${
                isHighlighted() ? `text-${selectedColor}` : ""
            }`}
            onClick={() => navigateToPage(route)}
        >
            <div className="flex justify-center items-center scale-[200%] md:scale-100 p-2 md:p-0">{icon}</div>
            <div className="hidden md:flex justify-center items-center sm:text-lg md:text-2xl font-semibold">{title ? title : route}</div>
        </div>
    );
};

export default SideItem;
