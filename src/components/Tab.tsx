import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnyRoute } from "~/types";
import { twMerge } from "tailwind-merge";
import getLocal from "~/utils/getLocal";
import getLocals from "~/utils/getLocals";
import { styles } from "~/utils/constants";

import Button from "./Button";

interface TabProps {
    title: string;
    className?: string;
    selectable?: boolean;
    route?: AnyRoute<string>;
    onClick?: () => void;
    style?: keyof typeof styles;
}

const Tab = ({ title, className, selectable = true, route, onClick, style = "TAB_GRAY_HOVER" }: TabProps) => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState(false);
    const tabStyle = getLocal("styles", style);
    const { COLOR_PRIMARY, COLOR_SECONDARY } = getLocals("colors");

    useEffect(() => {
        if (selectable) {
            const path = router.asPath;
            console.log(path, route, path === route);
            if (path === route) setIsSelected(true);
        }
    }, [router.asPath]);

    if (route) {
        return (
            <Link className={twMerge(`${tabStyle} ${isSelected ? `border-${COLOR_PRIMARY}` : ""}`, className)} href={route}>
                <div
                    className={`flex justify-center items-center flex-wrap min-h-full ${
                        isSelected ? "text-black" : `text-${COLOR_SECONDARY}`
                    }`}
                >
                    {title}
                </div>
            </Link>
        );
    }

    if (onClick) {
        return (
            <Button className={twMerge(`${tabStyle} ${isSelected ? `border-${COLOR_PRIMARY}` : ""}`, className)} onClick={onClick}>
                <div
                    className={`flex justify-center items-center flex-wrap min-h-full ${
                        isSelected ? `text-black` : `text-${COLOR_SECONDARY}`
                    }`}
                >
                    {title}
                </div>
            </Button>
        );
    }
};

export default Tab;
