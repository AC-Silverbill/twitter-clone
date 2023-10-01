import React from "react";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import { AnyRoute, BasicComponentWithChildren } from "~/types";
import getLocals from "~/utils/getLocals";

import Button from "../Button";

interface UserFeedSectionItemProps extends BasicComponentWithChildren {
    route: AnyRoute<string>;
}
const UserFeedSectionItem = ({ children, className, route }: UserFeedSectionItemProps) => {
    const { COLOR_WHITE_HIGHLIGHTED } = getLocals("colors");
    const router = useRouter();

    const isHighlighted = () => {
        if (router.asPath.includes(route)) return true;
        if (route === router.pathname) return true;

        return false;
    };

    const path = router.asPath;
    return (
        <Button
            className={twMerge(`flex-1 p-8 transition hover:bg-${COLOR_WHITE_HIGHLIGHTED} ${isHighlighted() && `text-black`}`, className)}
        >
            {children}
        </Button>
    );
};

export default UserFeedSectionItem;
