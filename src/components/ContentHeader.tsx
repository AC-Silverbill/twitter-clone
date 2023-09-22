import React from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";
import { useRouter } from "next/router";

interface ContentHeaderProps extends BasicComponentWithChildren {}

const ContentHeader = ({ className }: ContentHeaderProps) => {
    const router = useRouter();

    //prettier-ignore
    const title = router.pathname.split('/')

    return (
        <div className={twMerge("flex justify-between", className)}>
            <div>{title}</div>
            <div></div>
        </div>
    );
};

export default ContentHeader;
