import React from "react";
import Link from "next/link";
import { AnyRoute } from "~/types";
import getLocal from "~/utils/getLocal";
import { styles } from "~/utils/constants";

import Button from "./Button";
import { twMerge } from "tailwind-merge";

interface TabProps {
    title: string;
    route?: AnyRoute<string>;
    onClick?: () => void;
    className: string;
    style?: keyof typeof styles;
}

const Tab = ({ title, route, onClick, className, style = "TAB_GRAY_HOVER" }: TabProps) => {
    const tabStyle = getLocal("styles", style);

    if (route) {
        return (
            <Link className={twMerge(`${tabStyle}`, className)} href={route}>
                <div className={`flex justify-center items-center flex-wrap min-h-full`}>{title}</div>
            </Link>
        );
    }

    if (onClick) {
        return (
            <Button className={twMerge(`${tabStyle}`, className)} onClick={onClick}>
                <div className={`flex justify-center items-center flex-wrap min-h-full`}>{title}</div>
            </Button>
        );
    }
};

export default Tab;
