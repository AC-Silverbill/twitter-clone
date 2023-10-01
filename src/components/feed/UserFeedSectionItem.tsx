import React from "react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import { AnyRoute, BasicComponentWithChildren } from "~/types";
import getLocals from "~/utils/getLocals";

import Button from "../Button";
import Tab from "../Tab";

interface UserFeedSectionItemProps extends BasicComponentWithChildren {
    route: AnyRoute<string>;
    title: string;
    onClick: () => void;
}
const UserFeedSectionItem = ({ children, className, route, title, onClick }: UserFeedSectionItemProps) => {
    const { COLOR_WHITE_HIGHLIGHTED, COLOR_PRIMARY, COLOR_SECONDARY, COLOR_LIGHT_GRAY_DARKER } = getLocals("colors");
    const router = useRouter();

    const isHighlighted = () => {
        if (router.asPath.includes(route)) return true;
        if (route === router.pathname) return true;

        return false;
    };

    const path = router.asPath;
    return <Tab title={title} onClick={onClick} />;
};

export default UserFeedSectionItem;
