import React from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentWithChildren } from "~/types";
import getLocal from "~/utils/getLocal";

import Content from "./Content";
import { BiError } from "react-icons/bi";

interface ErrorFeedProps extends BasicComponentWithChildren {}
const ErrorFeed = ({ children, className }: ErrorFeedProps) => {
    const primaryColor = getLocal("colors", "COLOR_PRIMARY");

    return (
        <Content>
            <div className={twMerge(`h-full w-full flex justify-center items-center`, className)}>
                <div className="flex flex-col justify-center items-center">
                    <BiError size={100} color={"red"} />
                    {children}
                </div>
            </div>
        </Content>
    );
};

export default ErrorFeed;
