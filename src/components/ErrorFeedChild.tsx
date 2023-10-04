import React from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";
import getLocal from "~/utils/getLocal";

import Content from "./Content";
import { BiError } from "react-icons/bi";

interface ErrorFeedProps extends BasicComponentWithChildren {}
const ErrorFeedChild = ({ children, className }: ErrorFeedProps) => {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <div className={twMerge(`h-full w-full flex justify-center items-center`, className)}>
            <div className="flex flex-col">
                <BiError size={100} />
                {children}
            </div>
        </div>
    );
};

export default ErrorFeedChild;
